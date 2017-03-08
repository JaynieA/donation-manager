#Donation Manager

Donation Manager is a responsive, full-stack web application that tracks and manages the incoming donations received by the non-profit organization Spot’s Last Stop Canine Rescue. It is a central location to which all data provided in the form of CSV reports from the various donation platforms on which donations are received (i.e. Razoo, Paypal, WePay) may be uploaded, stored, viewed, and organized.

Based on the donor information provided from the CSV uploads, the Donation Manager will allow the user to send a thank you email (personalized from a template), or generate a PDF letter (also personalized from a template) to be printed. It will provide a system for tracking both if and when each donor has been thanked for their donation to the organization. Users must be given administrator privileges in order to access and use this application.

##Installation

To run Donation Manager locally:

* Ensure that [Node.js](https://nodejs.org/en/) is installed
* `npm install` dependencies
* `grunt uglify` to create minified client.min.css
* Donation Manager requires a MongoDB DBMS, and a database URI at `DATABASE_URI`. Donation Manager was developed using [MongoDB](https://www.mongodb.com/) and [Mongoose](http://mongoosejs.com/).
* In order to generate and send emails from within the app, the follow environmental variables are required:
  * `POSTMARK_KEY`
  * `POSTMARK_EMAIL` (sets the 'from' email address)
  * `GOOGLE_AUTH_CLIENT_ID`
  * `GOOGLE_AUTH_CLIENT_SECRET`
  * `GOOGLE_AUTH_CALLBACK_URL`
  * `DM_SESSION_SECRET`

##Demos

Donation Manager's home view contains a countdown that reminds the user when new reports are able to be accessed (monthly). Emails and PDF files are generated via the dashboard view.

<p align="center">
  <img src="public/images/demo.gif?raw=true" alt="ERD"/>
</p>

Template view allows the user to customize both the letter and email template text as desired.

<p align="center">
  <img src="public/images/templatedemo.png?raw=true" alt="ERD"/>
</p>

This application is currently hosted at [https://spotsdonations.herokuapp.com](https://spotsdonations.herokuapp.com), although users must be cleared in order to use the application.


##Technologies Used:

* Node.js
* Express.js
* AngularJS
* MongoDB
* Mongoose
* Passport
* Google OAuth
* Nodemailer
* Postmark
* Bootstrap
* UI Bootstrap
* SASS
* CSS3
* HTML5
* Papa Parse
* PDFKit
* ngAnimate
* ng-file-upload
* AngularJS Slider
