
let datos1 = new datos_control();
const modal_editador = document.getElementById("edit_modal_control");
const cerrar_modal_editar = document.getElementById("cerrar_modal_editar");
const cuerpo_editador = document.getElementsByClassName("edit_cuerpo_modal")[0];
const boton_reiniciador_modal = document.getElementById("boton_reiniciador_modal");
function vista_previa_datos2(informacion){
    modal_editador.style.display = "flex";
    let tabla; 
    if(datos1.get_control_ubdate() > 0){
      return;
    }
    tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.id = "tabla_datos_aux";
    datos1.agregar_valores_nuevos(informacion);
    datos = datos1.get_datos();
    tabla.innerHTML = generador_tabla_datos(datos);
    document.getElementsByClassName("datos_trabajo_modal")[0].innerHTML = "";
    document.getElementsByClassName("datos_trabajo_modal")[0].appendChild(tabla);
    const drake = dragula([document.getElementById('dragula')]);
    drake.on('drop', (el, target, source, sibling) => {
      console.log('Elemento arrastrado:', el); 
      console.log('Nuevo contenedor:', target);
      console.log('Contenedor original:', source);
      
      const children = Array.from(target.children);
      const newPosition = children.indexOf(el); 
      let pos_anterior = el.getAttribute("data-posicion_a");
      console.log('Nueva posición:', newPosition + 1,`pos anterior : ${pos_anterior}`);
      el.setAttribute("data-posicion_a",newPosition + 1);
      datos1.cambiar_hubicacion(pos_anterior,newPosition + 1);
    });
    // visibilidadElementos("block");
  }

cerrar_modal_editar.addEventListener("click",()=>{
  modal_editador.style.display = "none";
});

modal_editador.addEventListener("click",()=>{
  modal_editador.style.display = "none";

});

cuerpo_editador.addEventListener("click",function(e){
  e.stopPropagation();
})
boton_reiniciador_modal.addEventListener("click",()=>{
  datos1.agregar_valores_nuevos(informacion_archivos);
  tabla = document.createElement("table");
  tabla.classList.add("table");
  tabla.id = "tabla_datos_aux";
  datos = datos1.get_datos();
  tabla.innerHTML = generador_tabla_datos(datos);
  document.getElementsByClassName("datos_trabajo_modal")[0].innerHTML = "";
  document.getElementsByClassName("datos_trabajo_modal")[0].appendChild(tabla);
});

function generador_tabla_datos(datos){

  let contenido  = `
                  
                  <thead>
                      <tr>
              `;
  for (let i = 0; i < datos[0].length ; i++) {
      contenido +=`<th scope="col" class="editable_title formato-editable" data-x="${0}" data-y="${i}" ><div>${datos[0][i]}</div></th>`;
  }
  contenido += `
          </tr>
      </thead>
      <tbody id="dragula">
  `;
  for (let i = 2; i < datos.length; i++){
      let contenido_dato = `<tr data-posicion_a ="${i}">`;
      let posicion_aux = 0;
      datos[i].forEach(element => {
          posicion_aux ++;
          contenido_dato += `<td class="formato-editable" data-x="${i}" data-y="${posicion_aux}" ><div>${(element == "10101z")?"":element }</div></td>`;  
      });
      contenido_dato += "</tr>";
      contenido += contenido_dato;
  }
  contenido += "</tbody>"; 
  return contenido;
}
