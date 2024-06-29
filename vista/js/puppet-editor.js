// CODIGO PARA EL DISEÑO
let puppetTabla = document.querySelector("#puppet-tabla");
let sombraTabla = document.querySelector("#sombra_puppet");
let tabla_contenido = document.querySelector("#tabla_contenido");
let botones_tabla = document.querySelector("#botones_tabla");

let btn_agregar = document.querySelector("#btn_agregar");

function visibilidadElementos(estado){
  puppetTabla.style.display = estado;
  sombraTabla.style.display = estado;
  tabla_contenido.style.display = estado;
  botones_tabla.style.display = estado;
}

visibilidadElementos("none");

<<<<<<< HEAD
=======

>>>>>>> 6824628932d22510504cec6b21ea33d8fd408a5a
btn_agregar.addEventListener("click", function(e){
  visibilidadElementos("flex");
  e.stopPropagation();
})

sombraTabla.addEventListener("click", function(e){
  puppetTabla.style.display = "none";
  sombraTabla.style.display = "none";
  e.stopPropagation();
});

tabla_contenido.addEventListener("click",function(e){
  e.stopPropagation();
})
botones_tabla.addEventListener("click",function(e){
  e.stopPropagation();
})
puppetTabla.addEventListener("click", function(e){
  sombraTabla.style.display = "none";
  puppetTabla.style.display = "none";
  e.stopPropagation();
});