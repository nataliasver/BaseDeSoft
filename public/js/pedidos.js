function mostrarDatos(){
    if(document.getElementById('exampleDataList').value === ''){
        document.getElementById('tipoequipo').setAttribute('value', '')
        document.getElementById('marcaequipo').setAttribute('value', '')
    }
    const data = JSON.parse($("#results").val())
    const equipo = document.getElementById('exampleDataList').value
    const equipofiltrado = data.filter(unequipo => unequipo.equipo_modelo === equipo );
    document.getElementById('tipoequipo').setAttribute('value', equipofiltrado[0].tipo_equipo)
    document.getElementById('marcaequipo').setAttribute('value', equipofiltrado[0].marca_equipo)
}

function mostrarDatosOficinas(){
    if(document.getElementById('listaoficinas').value === ''){
        document.getElementById('direccionoficina').setAttribute('value', '')
        document.getElementById('telefonooficina').setAttribute('value', '')
        document.getElementById('emailoficina').setAttribute('value', '')
        document.getElementById('emailoficina').setAttribute('readonly','readonly');
    }
    const data = JSON.parse($("#resultados_oficinas").val())
    const oficina = document.getElementById('listaoficinas').value
    const oficinafiltrada = data.filter(unaoficina => unaoficina.oficina_nombre === oficina);
    document.getElementById('direccionoficina').setAttribute('value', oficinafiltrada[0].oficina_direccion);
    document.getElementById('telefonooficina').setAttribute('value', oficinafiltrada[0].oficina_telefono);
    document.getElementById('emailoficina').setAttribute('value', oficinafiltrada[0].oficina_email);
    document.getElementById('emailoficina').removeAttribute('readonly');
}

function eliminarpedido(){
    //Mostrar datos al modal para editar registro
    $('#mitabladepedidos').on('click', '.eliminarpedido', function(){
        let pedido_id = $(this).data('id');
        $('#DeletePedido').modal('show');
        $('.pedido_id_modal').val(pedido_id);
        console.log(pedido_id)
    })
}

function cambiodeestadopedido(){
    $('#mitabladepedidos').on('click', '.cambioestado', function(){
        let pedido_id = $(this).data('id');
        let estado_id = $(this).data('estado-id');
        $('#EditEstadoPedido').modal('show');
        $('.estado_id_modal').val(estado_id);
        $('.pedido_id_modal').val(pedido_id);
    })
}

function editarpedido(){
    $('#mitabladepedidos').on('click', '.edit', function(){
        let pedido_id = $(this).data('id');
        let equipo_id = $(this).data('equipo-id');
        let oficina_id = $(this).data('oficina-id');
        let serial_number = $(this).data('serial-number');
        let pedido_problema = $(this).data('pedido-problema');
        $('#EditPedido').modal('show');
        $('.equipo_id_modal').val(equipo_id);
        $('.serial_number_modal').val(serial_number);
        $('.oficina_id_modal').val(oficina_id);
        $('.problema_modal').val(pedido_problema);
        $('.pedido_id_modal').val(pedido_id);
    })
}

function editarmodelo(){
    //Mostrar datos al modal para editar registro
    $('#mitabladeequipos').on('click', '.edit', function(){
        let equipo_id = $(this).data('id');
        let equipo_modelo = $(this).data('equipo-modelo');
        let equipo_tipo = $(this).data('equipo-tipo');
        let equipo_marca = $(this).data('equipo-marca');
        $('#EditEquipo').modal('show');
        $('.equipo_id_modal').val(equipo_id);
        $('.equipo_modelo_modal').val(equipo_modelo);
        $('.equipo_tipo_modal').val(equipo_tipo);
        $('.equipo_marca_modal').val(equipo_marca);
    })
}

function editarmarca(){
    //Mostrar datos al modal para editar registro
    $('#mitablademarcas').on('click', '.edit', function(){
        let marca_equipo_id = $(this).data('id');
        let marca_equipo = $(this).data('marca-equipo');
        $('#EditModal').modal('show');
        $('.marca_equipo_id_modal').val(marca_equipo_id);
        $('.marca_equipo_modal').val(marca_equipo);
    })
}

function editartipo(){
    //Mostrar datos al modal para editar registro
    $('#mitabladetipos').on('click', '.edit', function(){
        let tipo_equipo_id = $(this).data('id');
        let tipo_equipo = $(this).data('tipo-equipo');
        $('#EditModal').modal('show');
        $('.tipo_equipo_id_modal').val(tipo_equipo_id);
        $('.tipo_equipo_modal').val(tipo_equipo);
    })
}

function editaroficina(){
    //Mostrar datos al modal para editar registro
    $('#mitabladeoficinas').on('click', '.edit', function(){
        let oficina_id = $(this).data('id');
        let oficina_nombre = $(this).data('oficina-nombre');
        let oficina_telefono = $(this).data('oficina-telefono');
        let oficina_direccion = $(this).data('oficina-direccion');
        let oficina_email = $(this).data('oficina-email');
        $('#EditOficina').modal('show');
        $('.oficina_id_modal').val(oficina_id);
        $('.oficina_nombre_modal').val(oficina_nombre);
        $('.oficina_direccion_modal').val(oficina_direccion);
        $('.oficina_telefono_modal').val(oficina_telefono);
        $('.oficina_email_modal').val(oficina_email);
    })
}


