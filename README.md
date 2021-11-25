## Bienvenidos!

# Proyecto Biblio de Soft

Video de presentación de la web: https://youtu.be/m1yRynxsGas 

Web realizada para una oficina de recepción de pedidos de reparación de equipos y soporte a otros centros de reparación.

Cuenta con 
- Página principal: muestra las con ultimas noticias
- Pestaña downloads: cada tarjeta redirigiria a un recurso en un servidor ftp
- Pestaña noticias: cuenta con el desarrollo de las ultimas 5 noticias publicadas
- Pestaña sobre nosotros: una descripción de las tareas de la oficina
- Pestaña office: acceso al backoffice de administración de pedidos

### Parte técnica de la web

La web cuenta con una conexión a "Ghost API" para obtener los posteos del blog de noticias. En el caso de que la web no se acceda por cierto tiempo, la primera vez en abrirse tarda un poco, ya que queda reactivando en heroku.
También cuenta con la administración de pedidos de reparación en back office (con su conexión a una base de datos online "Jaws DB" (que es un plugin de heroku). También cuenta con envio de correos cuando ingresa un nuevo pedido, o se cambia su estado (por el momento conectado con etheral para realizar pruebas)

En cuanto a contenido responsive, todas las pestañas fueron desarrolladas para que funcione correctamente en dispositivos moviles, exceptuando el backoffice, que como logica de negocio esta pensando para acceder desde una pc.

Quedan pendientes algunos cambios en la web que no se llegaron por el tiempo, como bloqueo del cambio de estado del pedido una vez finalizado, mostrar un aviso de que se envió el mail, visualizar al tocar en una noticia la noticia en la propia web, sin la redirección al post en ghost, funcionamiento correcto de la sesión (solo tiene sesión la pantalla /office, pero no las demás  pantallas del BackOffice, y falta la opción de logout).


