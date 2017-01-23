 //including the pdfkit module
var PDF = require('pdfkit');
var fs = require('fs');

//TODO: use Router to export this as a functionality...

//define text to be contained in the pdf document
var greeting = 'Dear Spot\s Last Stop Canine Rescue Supporter,';
//TODO: get the template text to send and be included here
var lorem = "Wafer powder ice cream sweet. Chocolate cake cake bear claw cupcake powder carrot cake. Powder pie wafer biscuit fruitcake sugar plum. Cheesecake sweet lollipop brownie tootsie roll croissant fruitcake. Jelly-o pastry sesame snaps pie caramels. Pie liquorice brownie tart halvah. Fruitcake brownie jelly icing jujubes cotton candy gingerbread. Danish sesame snaps chocolate bear claw cake bear claw pastry. Apple pie toffee danish apple pie danish. Icing pastry jelly. Biscuit jelly topping. Chocolate dessert dragée.";
var date = new Date();
var signatureOne = "Casey and Grant Adams";
var signatureTwo = 'Founder and Directors';

//creating a new PDF object
doc = new PDF();

//creating a write stream to write the content on the file system
doc.pipe( fs.createWriteStream( 'docs/NewDoc.pdf' ));

//Set the font size
doc.fontSize(14);
//Add the image
doc.image('docs/banner.png', 165, 50, { height: 75, width: 275 } );
//adding the text to be written,
doc.text( greeting, 100, 150);
doc.moveDown();
doc.text( lorem );
doc.moveDown();
doc.list(['one', 'two', 'three']);
doc.moveDown();
doc.text( date );
doc.moveDown();
doc.text( signatureOne );
doc.text( signatureTwo );

//end the document writing.
doc.end();
