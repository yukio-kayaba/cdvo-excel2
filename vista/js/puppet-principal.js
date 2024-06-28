// CODIGO PARA EL DISEÑO
let puppetTabla = document.querySelector("#puppet-tabla");
let sombraTabla = document.querySelector("#sombra_puppet");
let tabla_contenido = document.querySelector("#tabla_contenido");
let botones_tabla = document.querySelector("#botones_tabla");

let btn_agregar1 = document.querySelector("#agregar_archivo1");
let btn_agregar2 = document.querySelector("#agregar_archivo2");

function visibilidadElementos(estado){
  puppetTabla.style.display = estado;
  sombraTabla.style.display = estado;
  tabla_contenido.style.display = estado;
  botones_tabla.style.display = estado;
}

visibilidadElementos("none");

btn_agregar1.addEventListener("click",function(e){
  visibilidadElementos("flex");
  e.stopPropagation();
})

btn_agregar2.addEventListener("click", function(e){
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