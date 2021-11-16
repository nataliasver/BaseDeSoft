const express = require('express')
const hbs = require('hbs');
const mysql = require("mysql");
const path = require("path");
const session = require('express-session')
const cookieParser = require('cookie-parser')
const util = require("util");
const Routes = require('./routes')


//para la conexion con ghost (post)
const GhostContentAPI = require('@tryghost/content-api');
const BackOffice = require('./routes/backoffice');

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

    //Sesion
    const oneDay = 1000 * 60 * 60 * 24;
    app.use(session({
      secret: "mysecretrandomsecretsessioncredentialahre",
      saveUninitialized:true,
      cookie: { maxAge: oneDay },
      resave: false 
    }));

    //base de datos
    const conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "natalia_verdura",
    });
    
    //Con esto convierto en una promise las querys, asi puedo hacer varios llamados
    const querynaty = util.promisify(conn.query.bind(conn));
    
    //Conexion a la base
    conn.connect((err) => {
      if (err) throw err;
      console.log("Conexion establecida..");
    });

    //Conexion con ghost
    const apiGhost = new GhostContentAPI({
      url: 'https://bibliodesoft-ghost.herokuapp.com',
      key: 'f08792760871ae78e792f18eaf',
      version: "v3"
    });

    //Esto se utiliza para poder pasar todos los valores al frontend que no se renderizan
    hbs.registerHelper('json', function(context) {
      return JSON.stringify(context);
    });
    

    Routes.init(app, apiGhost);
    BackOffice.init(app,querynaty);



    // //Routes
    // app.get('/', async function (req, res) {
    //   try{
    //     const posts = await apiGhost.posts.browse({ limit: 4, include: 'tags,authors' });  
    //     res.render('index', {
    //       posts: posts.map(post => ({...post, published_at:dateString(post.published_at)}))
    //      });     
    //   }catch(err){
    //       res.render('404 not found');
    //   }  
    // })
    // app.get('/downloads', function (req, res) {
    //   res.render('downloads');
    // })

    // app.get('/noticias',async function (req, res) {
    //   try{
    //     const posts = await apiGhost.posts.browse({ limit: 5, include: 'tags,authors' });  
    //     res.render('noticias', {
    //       posts: posts
    //      });     
    //   }catch(err){
    //       res.render('404 not found');
    //   }  
    // })

    // app.get('/aboutus', function (req, res) {
    //   res.render('aboutus');
    // })
    
    // //Sesiones y back office
    // app.get('/office', function (req, res) {
    //   unasession=req.session;
    //   if(unasession.userid){
    //       res.redirect("/backoffice");
    //   }else
    //   res.render('office');
    // })
    // app.post('/office',(req,res) => {
    //   if(req.body.elusuario == myusername && req.body.lapassword == mypassword){
    //       unasession=req.session;
    //       unasession.userid=req.body.username;
    //       res.redirect('/backoffice');
    //   }
    //   else{
    //       res.send(`usuario o clave incorrecta <a href=\'office'>Volver a intentar</a>`);
    //   }
    // })
    // app.get('/logout',(req,res) => {
    //   req.session.destroy();
    //   res.redirect('/offfice');
    // });
    
    // app.get('/backoffice',async function(req, res, next){  
    //     let equipossql = "SELECT * FROM equipos LEFT JOIN marcasequipos ON equipos.marca_equipo_fk = marcasequipos.marca_equipo_id LEFT JOIN tiposequipos ON equipos.tipo_equipo_fk = tiposequipos.tipo_equipo_id";
    //     let oficinassql = "SELECT * FROM oficinas"
    //     try{
    //       const equipos = await querynaty(equipossql);
    //        const oficinas = await querynaty(oficinassql);
    //        res.render("pedidos", {
    //         results: equipos,
    //         oficinas: oficinas,
    //       });
    //     } catch ( err ) {
    //       console.log(err);
    //     } 
    //   //res.send(`En contrucción <a href=\'office'>Volver a la home y desloguearse</a>`)
    // });
    // app.get("/equipos", async function(req, res, next){  
    //   let equipossql = "SELECT * FROM equipos LEFT JOIN marcasequipos ON equipos.marca_equipo_fk = marcasequipos.marca_equipo_id LEFT JOIN tiposequipos ON equipos.tipo_equipo_fk = tiposequipos.tipo_equipo_id";
    //   try{
    //     const equipos = await querynaty(equipossql);
    //      res.render("equipos", {
    //       equipos: equipos,
    //     });
    //   } catch ( err ) {
    //     console.log(err);
    //   } 
    // });

    //Insertar

// app.post("/save", (req, res) => {
//   let data = {
//     producto_nombre: req.body.producto_nombre,
//     producto_precio: req.body.producto_precio,
//   };
//   let sql = "INSERT INTO producto SET ?";
//   const query = util.promisify(conn.query);
//   const results = await query(sql, data);
//   let query = conn.query(sql, data, (err, results) => {
//     if (err) throw err;
//     res.redirect("/");
//   });
// });

// app.post('/update',(req, res) => {
//   let sql = "UPDATE producto SET producto_nombre='"+req.body.producto_nombre+"', producto_precio='"+req.body.producto_precio+"' WHERE producto_id= "+req.body.id;
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//     res.redirect('/');
//   });
// });

    app.get('*', function (req, res) {
      res.render('notfound');
    })

    app.listen(process.env.PORT || 3000);
  }

}

module.exports = App;