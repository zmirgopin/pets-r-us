/** code attribution 
Title: appointments.js
Author: Zahava Gopin 
Date: 22 February 2023
Description: appointments.js (model) for pets-r-us app
*/
//Creating a new model to book appointments on the site. 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//schema is called appointments wih fields for username, name, email and type of service. 
const appointments = new Schema ({
    userName:{type: String, required: true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    service:{type: String, required: true}
})
//exporting the new model
module.exports = mongoose.model ('Booking', appointments); 