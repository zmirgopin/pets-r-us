/** code attribution 
Title: index.js
Author: Zahava Gopin 
Date: 2 February 2023
Description: index.js for pets-r-us app
*/
"use strict";
//Requiring all of the correct paths.
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');

const Customer = require('./models/customer');
const Appointment = require('./models/appointments');

const app = express(); 
//setting views as ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//opening on port 3000
const PORT = process.env.PORT || 3000;
//linking the right mongoDB database
const conn = 'mongodb+srv://web340_admin:Zee03rox@bellevueuniversity.r06aetm.mongodb.net/web340DB'

mongoose.connect(conn).then(() => {
    console.log('Connection to the database was successful');
}). catch (err =>{
    console.log('MongoDB Error' + err.message);
})
//Getting all of the pages that make up the app
app.get('/', (req, res) => {
    res.render('index', {
        title: 'pets-r-us: Home',
        pageTitle: 'Landing Page'
    })
});


app.get('/grooming', (req, res) =>{
    res.render('grooming', {
        title: 'pets-r-us: Grooming',
        pageTitle: "Grooming Services"
    })
});

app.get('/training', (req, res) =>{
    res.render('training', {
        title: 'pets-r-us: Training',
        pageTitle: "Training Services"
    })
});

app.get('/boarding', (req, res) =>{
    res.render('boarding', {
        title: 'pets-r-us: Boarding',
        pageTitle: "Boarding Services"
    })
});

app.get('/registration', (req, res) =>{
    res.render('registration', {
        title: 'pets-r-us: Registration',
        pageTitle: "Registration"
    })
});
//getting the customer data structure from the models folder, require both fields to be filled out. 
app.post('/customers',(req, res, next) =>{
    console.log(req.body);
    console.log(req.body.customerName);
    console.log(req.body.customerEmail);
    const newCustomer = new Customer ({
        customerId: req.body.customerName,
        email: req.body.customerEmail
    });
    console.log (newCustomer);

    Customer.create(newCustomer, function(err, customer){
        if (err){
            console.log(err);
            next(err);
        }else{
            res.render('./index', {
                title: 'pets-r-us: Home'
            })
        }
    })
});
//Log the customers and display on a list on the "list" (customer) web page. 
app.get('/customers', (req, res) => {
    Customer.find({}, function(err, customers)  {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.render('list', {
                title: 'pes-r-us: Customer List',
                pageTitle: 'customers',
                customers: customers
            })
        }
    })
})
//synching the services.json file (has all the possible services) to the appointments page
app.get('/appointments', (req, res) => {
    let jsonFile = fs.readFileSync('./public/data/services.json');
    let services = JSON.parse(jsonFile);

    console.log(services);

    res.render('appointments', {
        title: 'pets-r-us: Booking',
        pageTitle: 'Booking',
        services: services
    })
});
//Getting the appointments model from the correct folder, require all fields, create new appointment. 
app.post('/appointments', (req, res, next) => {
    const newAppointment = new Appointment ({
        userName: req.body.userName, 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email,
        service: req.body.service
    })

    Appointment.create(newAppointment, function(err, appointments){
        if (err){
            console.log(err);
            next(err);
        } else{
            res.render('index', {
                title: "pets-r-us: Home"
            })
        }
    })
})



app.listen(PORT, () => {
    console.log('Application started and listening on PORT' + PORT);
})
