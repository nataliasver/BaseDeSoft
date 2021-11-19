class BackOffice {

    //Para la sesion
    static init(app, querynaty) {
        const myusername = 'soporte'
        const mypassword = 'unaclave'
        let unasession;

        console.log('registra back office')

        //---------- Sesiones y back office --------------
        app.get('/office', function (req, res) {
            console.log('pegando a /office')
            unasession = req.session;
            if (unasession.userid) {
                res.redirect("/backoffice");
            } else
                res.render('office');
        })
        app.post('/office', (req, res) => {
            if (req.body.elusuario == myusername && req.body.lapassword == mypassword) {
                unasession = req.session;
                unasession.userid = req.body.username;
                res.redirect('/backoffice');
            }
            else {
                res.send(`usuario o clave incorrecta <a href=\'office'>Volver a intentar</a>`);
            }
        })
        app.get('/logout', (req, res) => {
            req.session.destroy();
            res.redirect('/offfice');
        });


        // ---------------- Pedidos ----------------------
        app.get('/backoffice', async function (req, res, next) {
            let equipossql = "SELECT * FROM equipos LEFT JOIN marcasequipos ON equipos.marca_equipo_fk = marcasequipos.marca_equipo_id LEFT JOIN tiposequipos ON equipos.tipo_equipo_fk = tiposequipos.tipo_equipo_id";
            let oficinassql = "SELECT * FROM oficinas"
            try {
                const equipos = await querynaty(equipossql);
                const oficinas = await querynaty(oficinassql);
                res.render("pedidos", {
                    results: equipos,
                    oficinas: oficinas,
                });
            } catch (err) {
                console.log(err);
            }
            //res.send(`En contrucción <a href=\'office'>Volver a la home y desloguearse</a>`)
        });
        //To Do: Faltaria añadir pedido, editar pedido, y eliminar pedido
        //----------------- Equipos ----------------------
        app.get("/equipos", async function (req, res, next) {
            let equipossql = "SELECT * FROM equipos LEFT JOIN marcasequipos ON equipos.marca_equipo_fk = marcasequipos.marca_equipo_id LEFT JOIN tiposequipos ON equipos.tipo_equipo_fk = tiposequipos.tipo_equipo_id";
            try {
                const equipos = await querynaty(equipossql);
                res.render("equipos", {
                    equipos: equipos,
                });
            } catch (err) {
                console.log(err);
            }
        });
        //To Do: Faltaria añadir equipo, editar equipo, y eliminar equipo
        //---------------- Marcas ------------------------
        app.get("/marcas", async function (req, res, next) {
            let marcassql = "SELECT * FROM marcasequipos";
            try {
                const marcas = await querynaty(marcassql);
                res.render("marcas", {
                    marcas: marcas,
                });
            } catch (err) {
                console.log(err);
            }
        });
        app.post("/updatemarca", async function (req, res, next) {
            let marcassql =
                "UPDATE marcasequipos SET marca_equipo='" +
                req.body.marca_equipo +
                "' WHERE marca_equipo_id=" +
                req.body.id;
            try {
                const updatemarcassql = await querynaty(marcassql);
                res.redirect("/marcas");
            } catch (err) {
                console.log(err);
            }
        });
        app.post("/savemarca", async function (req, res, next) {
            let data = {
                marca_equipo: req.body.marca_equipo,
                };
                let marcanuevasql = "INSERT INTO marcasequipos SET ?";
                try {
                const savemarcassql = await querynaty(marcanuevasql,data);          
                res.redirect("/marcas");
            } catch (err) {
                console.log(err);
            }
        });

        // ------------ Tipos de equipos ------------------
       
        app.get("/tipos", async function (req, res, next) {
            let tipossql = "SELECT * FROM tiposequipos";
            try {
                const tipos = await querynaty(tipossql);
                res.render("tipos", {
                    tipos: tipos,
                });
            } catch (err) {
                console.log(err);
            }
        });
        app.post("/updatetipo", async function (req, res, next) {
            let tipossql =
                "UPDATE tiposequipos SET tipo_equipo='" +
                req.body.tipo_equipo +
                "' WHERE tipo_equipo_id=" +
                req.body.id;
            try {
                const updatetipossql = await querynaty(tipossql);
                res.redirect("/tipos");
            } catch (err) {
                console.log(err);
            }
        });
        app.post("/savetipo", async function (req, res, next) {
            let data = {
                tipo_equipo: req.body.tipo_equipo,
                };
                let tiponuevosql = "INSERT INTO tiposequipos SET ?";
                try {
                const savetipossql = await querynaty(tiponuevosql,data);          
                res.redirect("/tipos");
            } catch (err) {
                console.log(err);
            }
        });

        //--------- Oficinas -----------------------
        app.get("/oficinas", async function (req, res, next) {
            let oficinassql = "SELECT * FROM oficinas";
            try {
                const oficinas = await querynaty(oficinassql);
                res.render("oficinas", {
                    oficinas: oficinas,
                });
            } catch (err) {
                console.log(err);
            }
        });
        app.post("/updateoficina", async function (req, res, next) {
            let oficinasql =
                "UPDATE oficinas SET oficina_nombre='" +
                req.body.oficina_nombre +
                "', oficina_direccion='"+ req.body.oficina_direccion +
                "', oficina_telefono='"+ req.body.oficina_telefono +
                "', oficina_email='"+ req.body.oficina_email + 
                "' WHERE oficina_id=" + req.body.id;
            try {
                const updateoficinasql = await querynaty(oficinasql);
                res.redirect("/oficinas");
            } catch (err) {
                console.log(err);
            }
        });
        app.post("/saveoficina", async function (req, res, next) {        
            let data = {
                oficina_nombre: req.body.oficina_nombre,
                oficina_direccion: req.body.oficina_direccion,
                oficina_telefono: req.body.oficina_telefono,
                oficina_email: req.body.oficina_email,
                };
                let oficinanuevasql = "INSERT INTO oficinas SET ?";
                try {
                const saveoficinasql = await querynaty(oficinanuevasql,data);          
                res.redirect("/oficinas");
            } catch (err) {
                console.log(err);
            }
        });

    }
}

module.exports = BackOffice;
