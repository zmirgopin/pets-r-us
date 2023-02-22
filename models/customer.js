/** code attribution 
Title: customer.js
Author: Zahava Gopin 
Date: 22 February 2023
Description: customer.js (model) for pets-r-us app
*/
"use strict";
//Creating a new mongoose schema to store data from site to MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//new schema is called customer, with fields for id and email
let Customer = new Schema ({
    customerId: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true}
})
//exporting the new model.
module.exports =mongoose.model('Customer', Customer);