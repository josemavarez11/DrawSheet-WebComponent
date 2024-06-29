# DrawSheet WebComponent

**DrawSheet Web Component was a university project where the goal was to create a web component that would generate a customizable drawing sheet supporting text, styles, local and online images and some geometric figures drawn in canvas. The drawing sheet had to be completely decoupled in order to be reusable.**

The sheet has three sections: header, main and footer.

The main section of the sheet is set as a grid to be able to divide it into smaller divisions. 
Once the main section is divided, each division of it is fully customizable.

In the "cssFolder" folder there are the general styles of the page and the blank sheet as well as a file "paramsStyle.css" which is where the style parameters for each section of the sheet and for each division of the main section are stored. 

The text and canvas properties are specified by creating parameter objects and passing them to the constructor of the DrawSheet class when we instantiate it to create an object of the class and use it in the HTML.

As an additional, I added a button that allows to print the drawing sheet in the state it is in (customized or blank).

This project helped me to understand concepts such as:
- Shadow DOM.
- Decoupled and reusable components in programming.
- Handling of classes, constructors and methods.
- HTML Custom Elements.
- Handling of parameter objects.

And more...

> [!NOTE]
> School project for web development I class at URU.
