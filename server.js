const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log  = `${ now }: ${req.method} ${req.originalUrl}`;
    console.log(log);
    fs.appendFile('server.log', log +'\n', (err)=>{
        if(err){
            console.log('Something went wrong!');
        }
    });
    next();
});

//app.use((req, res, next)=>{
//    res.render('maintanence.hbs', {
//        maintanenceMessage:'Coming soon!',
//        pageTitle: 'Maintanance'
//    });
//});
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});



app.get('/',(req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Node.js School'
    });
});


app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});


app.get('/bad', (req, res)=>{
    res.send({
        error:true,
        message:"Unable to fulfil request"
    });
});
app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});