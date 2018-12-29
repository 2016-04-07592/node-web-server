const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;




var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// //UNDER CONSTRUCTION MIDDLEWARE
// app.use((req, res, next) => {

//     res.render('maintanance.hbs');

// });

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {

    var now = new Date().toString();

    var log = `${now} :  ${req.method}  :  ${req.url} `;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('There is an error occured while writing the file')
        }

    });

    next();

});



hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


app.get('/', (req, res) => {

    //res.send('<h1> <em> Express!!!!!!!!!!!! <em> </h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our website',

    });
});


app.get('/about', (req, res) => {

    //res.send('About Page');

    res.render('about.hbs', {
        pageTitle: 'About Page',

    });

});



// Bad
app.get('/bad', (req, res) => {

    res.send({
        error: 'Unable to fullfil the reuslt'
    });

});




var server = app.listen(port, () => {
    //console.log(server.address());

    var host = server.address().address;
    var port = server.address().port;
    var family = server.address().family;
    console.log('Server is UP and RUNNING');
    console.log('HOST:', host);
    console.log('FAMILY:', family);
    console.log('PORT:', `${port}`);


});
//https: //docs.google.com/spreadsheets/d/1oVjH2PrTQLnn6H0diiSGthiUs328vrJ9kCwC14ANQPY/edit#gid=38763048