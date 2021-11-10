const express = require('express')
const hbs = require('hbs');
const mysql = require("mysql");
const path = require("path");
const session = require('express-session')
const cookieParser = require('cookie-parser')

//para la conexion con ghost (post)
const GhostContentAPI = require('@tryghost/content-api')

//Para la sesion
const oneDay = 1000 * 60 * 60 * 24;
const myusername = 'soporte'
const mypassword = 'unaclave'
let unasession;

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

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use("/assets", express.static(__dirname + "/public"));

    app.use(session({
      secret: "mysecretrandomsecretsessioncredentialahre",
      saveUninitialized:true,
      cookie: { maxAge: oneDay },
      resave: false 
    }));

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
    
    //Sesiones y back office
    app.get('/office', function (req, res) {
      unasession=req.session;
      if(unasession.userid){
          res.redirect("/backoffice");
      }else
      res.render('office');
    })
    app.post('/office',(req,res) => {
      if(req.body.elusuario == myusername && req.body.lapassword == mypassword){
          unasession=req.session;
          unasession.userid=req.body.username;
          res.redirect('/backoffice');
      }
      else{
          res.send(`usuario o clave incorrecta <a href=\'office'>Volver a intentar</a>`);
      }
    })
    app.get('/logout',(req,res) => {
      req.session.destroy();
      res.redirect('/offfice');
    });
    
    app.get('/backoffice',(req,res) => {
      res.send(`En contrucción <a href=\'office'>Volver a la home y desloguearse</a>`)
    });
    

    app.get('*', function (req, res) {
      res.send('Le re pifiaste man. 404 not found');
    })

    app.listen(process.env.PORT || 3000);
  }

}

module.exports = App;