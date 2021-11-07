const express = require('express')
const hbs = require('hbs');

const mysql = require("mysql");
const path = require("path");
//para la conexion con ghost (post)
const GhostContentAPI = require('@tryghost/content-api')

function getLocale() {
  if (typeof window === 'undefined' || navigator == null || navigator.language == null) {
      return 'es-AR'
  }

  if (navigator.languages != null) {
      return navigator.languages[0];
  }

  return navigator.language
}

function dateString(date) {
    date = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const locale = getLocale();

    const dateStr = date.toLocaleDateString(locale, options);

    return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}


class App {
  static async init() {
    const app = express();

    //Handlebars
    app.set("views", path.join(__dirname, "views"));
    app.set('view engine', 'hbs');

    app.use(express.static("public"));
    hbs.registerPartials(__dirname + "/views/partials/")

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/assets", express.static(__dirname + "/public"));



    // //Base de datos
    // const conn = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "bibliodesoftsql",
    // });

    // conn.connect((err) => {
    //   if (err) throw err;
    //   console.log("Conexion establecida..");
    // });


    //Conexion con ghost
    const apiGhost = new GhostContentAPI({
      url: 'https://bibliodesoft-ghost.herokuapp.com',
      key: 'f08792760871ae78e792f18eaf',
      version: "v3"
    });


    //Routes
    app.get('/', async function (req, res) {
      try{
        const posts = await apiGhost.posts.browse({ limit: 4, include: 'tags,authors' });  
        res.render('index', {
          posts: posts.map(post => ({...post, published_at:dateString(post.published_at)}))
         });     
      }catch(err){
          res.render('404 not found');
      }  
    })
    app.get('/downloads', function (req, res) {
      res.render('downloads');
    })

    app.get('/noticias',async function (req, res) {
      try{
        const posts = await apiGhost.posts.browse({ limit: 5, include: 'tags,authors' });  
        res.render('noticias', {
          posts: posts
         });     
      }catch(err){
          res.render('404 not found');
      }  
    })

    app.get('/aboutus', function (req, res) {
      res.render('aboutus');
    })

    app.get('*', function (req, res) {
      res.send('Le re pifiaste man. 404 not found');
    })

    app.listen(process.env.PORT || 3000);
  }

}

module.exports = App;