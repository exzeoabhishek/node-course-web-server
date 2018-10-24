const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});
/* app.use((req, res, next) => {
    res.render('maintain.hbs');
}); */

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    //res.send('<h1>Express app</h1>'); 
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeText: 'Welcome to my home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errMessage: 'Something bad has happened.'
    });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});