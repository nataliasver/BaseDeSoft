botonArriba = document.getElementById("btnIrArriba");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    botonArriba.style.display = "block";
  } else {
    botonArriba.style.display = "none";
  }
}
function irArriba() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}