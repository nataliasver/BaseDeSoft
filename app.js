const express = require('express')
const hbs = require('hbs');
const mysql = require("mysql");
const path = require("path");
const session = require('express-session')
const cookieParser = require('cookie-parser')
const util = require("util");

const Routes = require('./routes')
const BackOffice = require('./routes/backoffice');

//para la conexion con ghost (post)
const GhostContentAPI = require('@tryghost/content-api');


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
    
    //Llama a las rutas en otros archivos
    //Llama primero a Backoffice, para que no tome primero la ruta *
    BackOffice.init(app,querynaty);
    Routes.init(app, apiGhost);

    

    app.listen(process.env.PORT || 3000);
  }

}

module.exports = App;