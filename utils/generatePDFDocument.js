 //including the pdfkit module
var PDF = require('pdfkit');
var fs = require('fs');

//define text to be contained in the pdf document
var text = 'HOORAY I MADE SOMETHING!';
//creating a new PDF object
doc = new PDF();
//creating a write stream to write the content on the file system
doc.pipe(fs.createWriteStream('pdfTemplates/NewDoc.pdf'));
//adding the text to be written,
doc.text(text, 100, 100); // more things can be added here including new pages

//we end the document writing.
doc.end();
