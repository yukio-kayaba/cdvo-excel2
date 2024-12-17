
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
  let elementos_var = ["string","integer","real","date","class"];
  let contenido  = `
                  
                  <thead>
                      <tr>
              `;
  for (let i = 1; i < datos[0].length ; i++) {
      contenido +=`<th scope="col" class="editable_title formato-editable" data-x="${0}" data-y="${i}" >
                  <div style="font-size:20px;">${datos[0][i]}</div>
                  ${select_options(elementos_var,"selector_head_ubdate")}
      </th>`;
  }
  contenido += `<th scope="col"> * </th>`;
  contenido += `
          </tr>
      </thead>
      <tbody id="dragula">
  `;
  for (let i = 2; i < datos.length; i++){
      let contenido_dato = `<tr data-posicion_a ="${i}">`;
      let posicion_aux = 0;
      datos[i].forEach(element => {
          if(posicion_aux > 0){
            contenido_dato += `<td class="formato-editable" data-x="${i}" data-y="${posicion_aux}" ><div>${(element == "10101z")?"":element }</div></td>`;  
          }
          posicion_aux ++;
      });
      contenido_dato += `
      <td data-btn_item_delete="${i}">
        <div class="modal_eliminar_item">
            <svg fill="#000000" width="31px" height="31px" viewBox="0 0 24 24" id="delete-alt" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="secondary" d="M5,8H18a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a0,0,0,0,1,0,0V8A0,0,0,0,1,5,8Z" transform="translate(26 2) rotate(90)" style="fill: #f85454; stroke-width: 2;"></path><path id="primary" d="M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7" style="fill: none; stroke: #030635; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><path id="primary-2" data-name="primary" d="M10,11v6m4-6v6M4,7H20M18,20V7H6V20a1,1,0,0,0,1,1H17A1,1,0,0,0,18,20Z" style="fill: none; stroke: #030635; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></g></svg>
        </div>
      </td> `;  
      contenido_dato += "</tr>";
      contenido += contenido_dato;
  }
  contenido += "</tbody>"; 
  return contenido;
}
function select_options(lista=[],identificador = ""){
  let valores = `
      <div style="display:flex;justify-content:center;" >
          <select data-identify="${identificador}" class="form-select ${identificador} form-select-sm" aria-label="Small select example" style="width: 120px;" >
  `;
  lista.forEach(element => {
      valores += `
        <option>${element}</option>
      `;
  });
  valores += `
          </select>
      </div>
  `;
  return valores;
}
