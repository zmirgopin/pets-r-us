"use strict";

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const Customer = require('./models/customer');


const app = express(); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

const conn = 'mongodb+srv://web340_user:admin@cluster0.lujih.mongodb.net/web340DB?retryWrites=true&w=majority';

mongoose.connect(conn).then(() => {
    console.log('Connection to the database was successful');
}). catch (err =>{
    console.log('MongoDB Error' + err.message);
})

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
})

app.listen(PORT, () => {
    console.log('Application started and listening on PORT' + PORT);
})
