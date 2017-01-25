 //including the pdfkit module
var PDF = require('pdfkit');
var fs = require('fs');
var Template = require('../models/template');

var generatePDF = function(object, res) {
  console.log('in generatePDF', object.donor_name, object.donation_amt);
  //marshall object variables
  var donor_name = object.donor_name;
  var donor_address = object.donor_address;
  var donor_city = object.donor_city;
  var donor_state = object.donor_state;
  var donor_zip = object.donor_zip;
  //Get the default letter text
  Template.findOne( { default:true, type:'letter' }, function(err, results) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      var text = results.text;
      //define text to be contained in the pdf document
      var greeting = 'Dear ' + donor_name + ', \n';
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
      doc.moveDown(3);
      doc.text( signatureOne );
      doc.text( signatureTwo );
      //add a second page to contain the address of the person
      doc.addPage().text( donor_name + '\n' + donor_address + '\n' + donor_city + ', ' + donor_state + ' ' + donor_zip );
      //end the document writing.
      doc.end();
      //send a response
      res.sendStatus(200);
    } // end else
  }); // end find
}; // end generatePDF


module.exports = generatePDF;
