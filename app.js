const express = require('express')
const hbs = require('hbs');
const app = express();

//Handlebars

app.set('view engine','hbs');

app.use(express.static("public"));
hbs.registerPartials(__dirname+"/views/partials/")

app.get('/', function (req, res) {
  res.render('index');
})
app.get('/downloads', function (req, res) {
  res.render('downloads');
})

app.get('/noticias', function (req, res) {
  res.render('noticias');
  })

app.get('/aboutus', function (req, res) {
    res.render('aboutus');
  })
 
app.get('*', function (req, res) {
    res.send('Le re pifiaste man. 404 not found');
})
 
app.listen(3000);