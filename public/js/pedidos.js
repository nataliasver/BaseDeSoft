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


// function abrirmodalparaeditar(){
//     //Mostrar datos al modal para editar registro
//     $('#mytable').on('click', '.edit', function(){
//         let producto_id = $(this).data('id');
//         let producto_nombre = $(this).data('producto_nombre');
//         let producto_precio = $(this).data('producto_precio');
//         $('#EditModal').modal('show');
//         $('.producto_nombre').val(producto_nombre);
//         $('.precio').val(producto_precio);
//         $('.producto_id').val(producto_id);
//     })
//     // Modal DELETE     
//     $('#mytable').on('click', '.delete', function(){
//         let producto_id = $(this).data('id');
//         $('#DeleteModal').modal('show');
//         $('.producto_id2').val(producto_id);

//     })
// })


