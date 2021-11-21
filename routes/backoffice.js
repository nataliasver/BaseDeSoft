function getLocale() {
    if (typeof window === 'undefined' || navigator == null || navigator.language == null) {
        return 'es-AR'
    }

    if (navigator.languages != null) {
        return navigator.languages[0];
    }

    return navigator.language
}


class BackOffice {

    static _dateString(date) {
        date = new Date(date);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const locale = getLocale();

        const dateStr = date.toLocaleDateString(locale, options);

        return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    }
    //Para la sesion
    static init(app, querynaty) {
        const myusername = 'soporte'
        const mypassword = 'unaclave'
        let unasession;



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
            let pedidossql = "SELECT * FROM `pedidos` LEFT JOIN equipos ON pedidos.equipo_id_fk = equipos.equipo_id LEFT JOIN tiposequipos ON equipos.tipo_equipo_fk = tiposequipos.tipo_equipo_id LEFT JOIN marcasequipos ON equipos.marca_equipo_fk = marcasequipos.marca_equipo_id LEFT JOIN oficinas ON pedidos.oficina_id_fk = oficinas.oficina_id LEFT JOIN estadosreparacion ON pedidos.estado_id_fk = estadosreparacion.estado_id;"
            let oficinassql = "SELECT * FROM oficinas";
            let equipossql = "SELECT * FROM equipos LEFT JOIN marcasequipos ON equipos.marca_equipo_fk = marcasequipos.marca_equipo_id LEFT JOIN tiposequipos ON equipos.tipo_equipo_fk = tiposequipos.tipo_equipo_id";
            let marcassql = "SELECT * FROM marcasequipos";
            let tipossql = "SELECT * FROM tiposequipos";
            let estadossql = "SELECT * FROM estadosreparacion";
            try {
                const pedidos = await querynaty(pedidossql);
                const oficinas = await querynaty(oficinassql);
                const equipos = await querynaty(equipossql);
                const marcas = await querynaty(marcassql);
                const tipos = await querynaty(tipossql);
                const estados = await querynaty(estadossql);
                res.render("backoffice", {
                    equipos: equipos,
                    oficinas: oficinas,
                    tipos: tipos,
                    marcas: marcas,
                    pedidos: pedidos.map(pedido => ({ ...pedido, pedido_fecha_inicio: BackOffice._dateString(pedido.pedido_fecha_inicio) })),
                    estados: estados,
                });
            } catch (err) {
                console.log(err);
            }
        });

        app.post("/savepedido", async function (req, res, next) {
            const date = Date.now();
            let date_ob = new Date(date);
            let dateday = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let datetoday = year + "-" + month + "-" + dateday

            let data = {
                equipo_id_fk: req.body.equipo_id,
                serial_number: req.body.serial_number,
                oficina_id_fk: req.body.oficina_id,
                pedido_problema: req.body.problema,
                pedido_fecha_inicio: datetoday,
                estado_id_fk: 1,
            };
            let pedidonuevosql = "INSERT INTO pedidos SET ?";
            try {
                const saveequiposql = await querynaty(pedidonuevosql, data);
                res.redirect("/backoffice");
            } catch (err) {
                console.log(err);
            }
        });

        app.post('/deletepedido', async function (req, res, next) {
            let deletepedidosql = "DELETE FROM pedidos WHERE pedido_id=" + req.body.id + "";
            try {
                const deletepedido = await querynaty(deletepedidosql);
                res.redirect("/backoffice");
            } catch (err) {
                console.log(err);
            }
        });


        //To Do: Faltaria añadir pedido, editar pedido y cambio de estado
        //----------------- Equipos ----------------------
        app.get("/equipos", async function (req, res, next) {
            let equipossql = "SELECT * FROM equipos LEFT JOIN marcasequipos ON equipos.marca_equipo_fk = marcasequipos.marca_equipo_id LEFT JOIN tiposequipos ON equipos.tipo_equipo_fk = tiposequipos.tipo_equipo_id";
            let marcassql = "SELECT * FROM marcasequipos";
            let tipossql = "SELECT * FROM tiposequipos";
            try {
                const equipos = await querynaty(equipossql);
                const marcas = await querynaty(marcassql);
                const tipos = await querynaty(tipossql);
                res.render("equipos", {
                    equipos: equipos,
                    tipos: tipos,
                    marcas: marcas,
                });
            } catch (err) {
                console.log(err);
            }
        });
        app.post("/updateequipo", async function (req, res, next) {
            //equipos.marca_equipo_fk equipos.tipo_equipo_fk = tiposequipos.tipo_equipo_id";
            let equipossql =
                "UPDATE equipos SET marca_equipo_fk='" +
                req.body.marca_equipo_id +
                "', tipo_equipo_fk='" + req.body.tipo_equipo_id +
                "', equipo_modelo='" + req.body.equipo_modelo +
                "' WHERE equipo_id=" +
                req.body.id;
            try {
                const updateequipossql = await querynaty(equipossql);
                res.redirect("/equipos");
            } catch (err) {
                console.log(err);
            }
        });
        app.post("/saveequipo", async function (req, res, next) {
            let data = {
                equipo_modelo: req.body.equipo_modelo,
                tipo_equipo_fk: req.body.tipo_equipo_id,
                marca_equipo_fk: req.body.marca_equipo_id,
            };
            let equiponuevosql = "INSERT INTO equipos SET ?";
            try {
                const saveequiposql = await querynaty(equiponuevosql, data);
                res.redirect("/equipos");
            } catch (err) {
                console.log(err);
            }
        });

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
                const savemarcassql = await querynaty(marcanuevasql, data);
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
                const savetipossql = await querynaty(tiponuevosql, data);
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
                "', oficina_direccion='" + req.body.oficina_direccion +
                "', oficina_telefono='" + req.body.oficina_telefono +
                "', oficina_email='" + req.body.oficina_email +
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
                const saveoficinasql = await querynaty(oficinanuevasql, data);
                res.redirect("/oficinas");
            } catch (err) {
                console.log(err);
            }
        });

    }
}

module.exports = BackOffice;
