 //including the pdfkit module
var PDF = require('pdfkit');
var fs = require('fs');
var Template = require('../models/template');

//Get the default letter text
Template.findOne( { default:true, type:'letter' }, function(err, results) {
  if (err) {
    console.log(err);
  } else {
    var text = results.text;
    //define text to be contained in the pdf document
    var greeting = 'Dear Spot\s Last Stop Canine Rescue Supporter,';
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
    doc.text( text );
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.text( signatureOne );
    doc.text( signatureTwo );

    //end the document writing.
    doc.end();
  } // end else
}); // end find
