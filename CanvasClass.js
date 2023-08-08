class MyCanvas{
    constructor(target, params){
        this.target = target;
        this.params = params;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.target.clientWidth;
        this.canvas.height = this.target.clientHeight;
        this.target.appendChild(this.canvas);
    }
    detect(){
        if(this.params.line) this.addLine();
        if(this.params.bar) this.addBar();
        if(this.params.ellipse) this.addEllipse();
        if(this.params.circle) this.addCircle();
    }
    addLine(){
        Object.assign(this.ctx, this.params.line);
        this.ctx.beginPath();
        this.ctx.moveTo(this.params.line.coords.startx, this.params.line.coords.starty);
        this.ctx.lineTo(this.params.line.coords.endx, this.params.line.coords.endy);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    addBar(){
        Object.assign(this.ctx, this.params.bar);
        this.ctx.beginPath();
        this.ctx.fillRect(this.params.bar.coords.x, this.params.bar.coords.y, this.params.bar.size.width, this.params.bar.size.height);
        this.ctx.closePath();
    }
    addCircle(){
        Object.assign(this.ctx, this.params.circle);
        this.ctx.beginPath();
        this.ctx.arc(this.params.circle.coords.x, this.params.circle.coords.y, this.params.circle.radius, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    addEllipse(){
        Object.assign(this.ctx, this.params.ellipse);
        this.ctx.beginPath();
        this.ctx.ellipse(this.params.ellipse.coords.x, this.params.ellipse.coords.y, this.params.ellipse.radius.x, this.params.ellipse.radius.y, 0, 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}