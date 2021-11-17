class BackOffice {

    //Para la sesion
    static init(app, querynaty) {
        const myusername = 'soporte'
        const mypassword = 'unaclave'
        let unasession;

        console.log('registra back office')

        //Sesiones y back office
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
    }


}

module.exports = BackOffice;
