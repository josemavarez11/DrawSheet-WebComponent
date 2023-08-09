class DrawSheet extends HTMLElement{
    constructor(textProps, canvasProps){
        super();
        this.attachShadow({mode: 'open'});
        if(textProps){
            this.propertiesWithText = Object.keys(textProps);
            this.textInProperties = Object.values(textProps);
        }
        if(canvasProps){
            this.canvasProps = canvasProps;
            this.elementsWithCanvas = Object.keys(canvasProps);
        }
        this.printButton;
    }

    insertPrintButton(){
        this.printButton = new Image();
        this.printButton.src = "./img/print.svg";
        this.printButton.alt = "Print Icon";
        this.printButton.id = "printIcon";
        document.body.appendChild(this.printButton);
    }
    
    async connectedCallback(){
        await this.render();
        this.insertPrintButton();
        await this.customize();
        this.printButton.addEventListener('click', () => this.printSheet());
    }
    async render(){
        const style = document.createElement('style');
        await fetch('./cssFolder/sheetStyle.css')
        .then(response => response.text())
        .then(css => {
            style.textContent += css;
            this.shadowRoot.appendChild(style);
        })
        .catch(error => console.log('Error al cargar la hoja de estilos en DrawSheet ', error));

        await fetch('./html/template.html')
        .then(response => response.text())
        .then(template => this.shadowRoot.innerHTML += template)
        .catch(error => console.log('Error al cargar el template del DrawSheet', error));
    }
    async customize(){
        const mainSection = this.shadowRoot.querySelector('main');

        await fetch('./cssFolder/paramsStyle.css')
        .then(response => response.text())
        .then(params => {
            let styleElement = document.createElement('style');
            styleElement.textContent = params;
            this.shadowRoot.querySelector('style').textContent += params;
        })
        .catch(error => console.log('Error al cargar los parámetros de estilos para la hoja', error));

        const divsGrid = [];
        for(let i=1; i<=this.getDivisionGrid(); i++){
            let newDiv = document.createElement('div');
            newDiv.id = `division${i}`;
            divsGrid.push(newDiv);
        }

        divsGrid.forEach(div =>{
            mainSection.appendChild(div);
            if(this.elementsWithCanvas && div.id === this.elementsWithCanvas[this.elementsWithCanvas.indexOf(div.id)]){
                let newCanvas = new MyCanvas(div, this.canvasProps[div.id]);
                newCanvas.detect();
            } 
        });
        this.setText();
    }
    getDivisionGrid(){
        let mainStyles = getComputedStyle(this.shadowRoot.querySelector('main'));
        let columnsCount = mainStyles.getPropertyValue('grid-template-columns').split(' ').length;
        let rowsCount = mainStyles.getPropertyValue('grid-template-rows').split(' ').length;
        return columnsCount*rowsCount;
    }
    setText(){
        if(this.propertiesWithText && this.textInProperties){
            this.propertiesWithText.forEach((propertie, index) => {
                let element;
                if(propertie.startsWith('division')) element = this.shadowRoot.getElementById(propertie);
                else element = this.shadowRoot.querySelector(propertie);
                element.textContent = this.textInProperties[index];
            });
        }
    }
    
    printSheet(){ 
        let container = this.shadowRoot.querySelector('#container');
        let cloneContainer = container.cloneNode(true);
        cloneContainer.style.width = `${container.offsetWidth}px`;
        cloneContainer.style.height = `${container.offsetHeight}px`;
        cloneContainer.style.marginLeft = `${-150}px`;

        let tempDiv = document.createElement('div');
        tempDiv.appendChild(cloneContainer);
        let printWindow = window.open('', '', 'height=800, width=700');
        if(printWindow) {
            let styles = Array.from(this.shadowRoot.styleSheets).map(styleSheet => styleSheet.href || styleSheet.ownerNode.textContent).join('\n');
            let printStyles = printWindow.document.createElement('style');
            printStyles.textContent = styles;
            printWindow.document.head.appendChild(printStyles);
            printWindow.document.body.appendChild(tempDiv);
            //-------canvas
            let divs = cloneContainer.querySelector('main').getElementsByTagName('div');
            let divsWithCanvas = [];
            for(let i=0; i<divs.length; i++) if(divs[i].querySelector('canvas')) divsWithCanvas.push(divs[i]);
            divsWithCanvas.forEach(divWithCanvas => {
                divWithCanvas.querySelector('canvas').remove();
                let newCanvas = new MyCanvas(divWithCanvas, this.canvasProps[divWithCanvas.id]);
                newCanvas.detect();
            });
            //--------canvas
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }else alert('Error al imprimir el DrawSheet');
    }
}

window.customElements.define('draw-sheet', DrawSheet);