const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('message', (message) => {
    return message;
});

app.use( (req, res, next) => {
    let now = new Date().toString();

    const log = `${now} : ${req.method} ${req.url} \n`;
    fs.appendFileSync('server-log.log', log);

    next ();
} );

// app.use( (req, res, next) => {

//     res.render('maintainace');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    
    res.render('home.hbs', {
        pageTitle:  'Home Page',
        message: 'Welcome to the Website'
    });
    
});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });

});

app.get('/bad', (req, res) => {
    res.send('A Bad Request!');
});

app.listen(3000, () => {
    console.log(`Server has started at port ${port}`);
});