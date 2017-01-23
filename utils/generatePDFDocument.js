 //including the pdfkit module
var PDF = require('pdfkit');
var fs = require('fs');

//TODO: use Router to export this as a function...
//TODO: get the template text to send and be included here

//define text to be contained in the pdf document
var text = 'HOORAY I MADE SOMETHING!' + new Date();
//creating a new PDF object
doc = new PDF();
//creating a write stream to write the content on the file system
doc.pipe( fs.createWriteStream( 'pdfTemplates/NewDoc.pdf' ));


//Add the image
doc.image('pdfTemplates/banner.png', 50, 50, { height: 75, width: 275 } );
//adding the text to be written,
doc.text( text, 100, 100 ); // more things can be added here including new pages


//end the document writing.
doc.end();
