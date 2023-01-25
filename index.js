"use strict";

const express = require('express');
const path = require('path');

const app = express(); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;

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


app.listen(PORT, () => {
    console.log('Application started and listening on PORT' + PORT);
})
