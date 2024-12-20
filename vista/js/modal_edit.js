
let datos1 = new datos_control();
const modal_editador = document.getElementById("edit_modal_control");
const cerrar_modal_editar = document.getElementById("cerrar_modal_editar");
const cuerpo_editador = document.getElementsByClassName("edit_cuerpo_modal")[0];
const boton_reiniciador_modal = document.getElementById("boton_reiniciador_modal");
const boton_recargar_datos = document.getElementById("recargar_datos");
const descargar_archivo_arrff1 = document.getElementById("descargar_archivo_arrff");
let datos;
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

    cargar_eventos("selector_head_ubdate",evento_etiqueta);
    cargar_eventos("modal_eliminar_item",delete_items,"click");
    habilitar_editable("dragula");
    $(document).ready(function(){
        $(document).on("dblclick",".formato-editable",function(e){
          let elemento = $(this);
          console.log(elemento);
          let pos_x = elemento[0].dataset.x;
          let pos_y = elemento[0].dataset.y;
          console.log(`x : ${pos_x} - y : ${pos_y}`);
          let etiqueta = elemento.find("div");
          let contenido = etiqueta.text();
          let notificacion = new notficacion("contenedor-toast_date");

          let input = $("<input>").attr("type", `${typeof(datos1.get_dato())}`).val(contenido);
          etiqueta.replaceWith(input);
          input.focus();
          input.blur(function(){
            let nuevo_texto = input.val();
            let nuevo_div = $("<div>").text(nuevo_texto);
            input.replaceWith(nuevo_div);
            datos1.reemplazar_valor(pos_x,pos_y,nuevo_texto);
            if(nuevo_texto != contenido){
              notificacion.generador_text_valor({tipo:"exito",titulo:'Exito',descripcion:'Se actualizo ' + nuevo_texto,tiempo:3000,autocierre:true});
            }
          });
        });
    });
    $(document).on("contextmenu",".formato-editable",function(e){
      e.preventDefault();
    });
  }

cerrar_modal_editar.addEventListener("click",()=>{
  modal_editador.style.display = "none";
});

modal_editador.addEventListener("click",()=>{
  modal_editador.style.display = "none";

});

boton_recargar_datos.addEventListener("click",()=>{
  recargar_datos();
});

descargar_archivo_arrff1.addEventListener("click",()=>{
  downloadArff2(datos1.get_datos());
});

cuerpo_editador.addEventListener("click",function(e){
  e.stopPropagation();
})
boton_reiniciador_modal.addEventListener("click",()=>{
  document.getElementsByClassName("datos_trabajo_modal")[0].style.filter = "blur(10px)";
  datos1.agregar_valores_nuevos(informacion_archivos);
  tabla = document.createElement("table");
  tabla.classList.add("table");
  tabla.id = "tabla_datos_aux";
  datos = datos1.get_datos();
  eliminar_eventos("selector_head_ubdate",evento_etiqueta);
  eliminar_eventos("modal_eliminar_item",delete_items,"click");
  tabla.innerHTML = generador_tabla_datos(datos);
  document.getElementsByClassName("datos_trabajo_modal")[0].innerHTML = "";
  document.getElementsByClassName("datos_trabajo_modal")[0].appendChild(tabla);
  cargar_eventos("selector_head_ubdate",evento_etiqueta);
  cargar_eventos("modal_eliminar_item",delete_items,"click");
  document.getElementsByClassName("datos_trabajo_modal")[0].style.filter = "none";
  habilitar_editable("dragula");
});

function generador_tabla_datos(datos,reiniciar = 0){
  let elementos_var = ["String","Numeric","Date","Class"];
  let contenido  = `
                  
                  <thead>
                      <tr>
              `;
  for (let i = 1; i < datos[0].length ; i++) {
      let pos_activa = 0;
      for(let i = 0;i < elementos_var.length;i++){
        if(reiniciar == 0){
          datos1.reemplazar_valor(1,i,elementos_var[0]);
        }
        if(elementos_var[i] === datos[1][i]){
          pos_activa = i;
        }
      }
      contenido +=`<th scope="col" class="editable_title formato-editable" data-x="${0}" data-y="${i}" >
                  <div style="font-size:20px;">${datos[0][i]}</div>
                  ${select_options(elementos_var,"selector_head_ubdate",i,pos_activa)}
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
      <td >
        <button class="modal_eliminar_item" data-btn_item_delete="${i}">
            <svg fill="#000000" width="31px" height="31px" style="pointer-events: none;" viewBox="0 0 24 24" id="delete-alt" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="secondary" d="M5,8H18a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a0,0,0,0,1,0,0V8A0,0,0,0,1,5,8Z" transform="translate(26 2) rotate(90)" style="fill: #f85454; stroke-width: 2;"></path><path id="primary" d="M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7" style="fill: none; stroke: #030635; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><path id="primary-2" data-name="primary" d="M10,11v6m4-6v6M4,7H20M18,20V7H6V20a1,1,0,0,0,1,1H17A1,1,0,0,0,18,20Z" style="fill: none; stroke: #030635; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></g></svg>
        </button>
      </td> `;  
      contenido_dato += "</tr>";
      contenido += contenido_dato;
  }
  contenido += "</tbody>"; 
  return contenido;
}

function select_options(lista=[],identificador = "",posicion = 0,pos_select = 0){
  let valores = `
      <span style="display:flex;justify-content:center;" >
          <select data-identify="${posicion}" class="form-select ${identificador} form-select-sm" aria-label="Small select example" style="width: 120px;" >
  `;
  let pos_avance = 0;
  lista.forEach(element => {
      if(pos_avance == pos_select){
        valores += `
          <option selected>${element}</option>
        `;
      }else{
        valores += `
          <option>${element}</option>
        `;
      }
      pos_avance ++;
  });
  valores += `
          </select>
      </span>
  `;
  return valores;
}

//funcion para el evento de change , es decir cuando cambie de opcion
function evento_etiqueta(e){
  let etiqueta = e.target;
  let elementos_var = ["String","Numeric","Date","Class"];
  let identificador = etiqueta.attributes["data-identify"].value;
  let opcion_selecionada = etiqueta.selectedIndex;
  console.log(`posicion : ${identificador }  -  opcion : ${opcion_selecionada}`);
  let inf_opc = 0;
  let notificacion = new notficacion("contenedor-toast_date");
  if(opcion_selecionada == 0 || opcion_selecionada == 1){
    inf_opc = (opcion_selecionada == 1)? 1 : 0;
    let resultado = datos1.conversion_datos(Number(identificador),inf_opc);
    if(resultado == 1){
      notificacion.generador_text_valor({tipo:"exito",titulo:'Exito',descripcion:'CONVERSION EXITOSA ',tiempo:3000,autocierre:true});
    }else if(resultado == -2){
      notificacion.generador_text_valor({tipo:"peligro",titulo:'ERRONEA CONVERSION',descripcion:'Existe un valor no apto para la conversion ',tiempo:3000,autocierre:true});
    }
    datos1.reemplazar_valor(1,identificador,elementos_var[Number(opcion_selecionada)]);
  }else if(opcion_selecionada == 3){
      datos1.convertir_clases(Number(identificador));
      datos1.reemplazar_valor(1,(datos1.get_cant_datos() - 1),elementos_var[Number(opcion_selecionada)]);
      recargar_datos();
      let contantes = datos1.get_clases(datos1.get_cant_datos() - 1);
      notificacion.generador_text_valor({tipo:"exito",titulo:'Conversion exitosa',descripcion:`Se conviritio en clases \n ${contantes}`,tiempo:3000});
      notificacion.event_close_object();
  }else if(opcion_selecionada == 2){
    let resultado = datos1.conversion_fecha();
    if(resultado == 1){
        datos1.reemplazar_valor(1,identificador,elementos_var[Number(opcion_selecionada)]);
        notificacion.generador_text_valor({tipo:"exito",titulo:'Datos a fecha exitoso',descripcion:'Se Ha convertido los datos con exito',tiempo:3000,autocierre:true});
    }else{
        notificacion.generador_text_valor({tipo:"peligro",titulo:'Error de conversion ',descripcion:' Ocurrio un error al momento de convertir los datos',tiempo:3000,autocierre:true});
    }
  }
}

//funcion para eliminar los datos
function delete_items(e){
  let etiqueta = e.target;
  let posicion = etiqueta.attributes["data-btn_item_delete"].value;
  const fila = etiqueta.closest('tr');
  console.log(`pos : ${posicion}`);
  console.log(fila);
  datos1.eliminar_valor(Number(posicion));
  fila.classList.add("eliminar_dato");
  setTimeout(()=>{
    fila.remove();
  },500);
}

function cargar_eventos(classes,funcion,tipo_evento = "change") {
  let prueba_generador = document.getElementsByClassName(classes);
  for (let i = 0; i < prueba_generador.length; i++) {
      prueba_generador[i].addEventListener(tipo_evento,funcion);
  }
}

function eliminar_eventos(classes,funcion,tipo_evento = "change"){
  let prueba_generador = document.getElementsByClassName(classes);
  for (let i = 0; i < prueba_generador.length; i++) {
      prueba_generador[i].removeEventListener(tipo_evento,funcion);
  }
}

function habilitar_editable(id_dato){
  const drake = dragula([document.getElementById(id_dato)]);
    drake.on('drop', (el, target, source, sibling) => {
      // console.log('Elemento arrastrado:', el); 
      // console.log('Nuevo contenedor:', target);
      // console.log('Contenedor original:', source);
      
      const children = Array.from(target.children);
      const newPosition = children.indexOf(el); 
      let pos_anterior = el.getAttribute("data-posicion_a");
      console.log('Nueva posición:', newPosition + 2,`pos anterior : ${pos_anterior}`);
      el.setAttribute("data-posicion_a",newPosition + 2);
      datos1.cambiar_hubicacion(pos_anterior,newPosition + 2);
    });
}

function recargar_datos(){
    document.getElementsByClassName("datos_trabajo_modal")[0].style.filter = "blur(10px)";
    tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.id = "tabla_datos_aux";
    const datos = datos1.get_datos();
    eliminar_eventos("selector_head_ubdate",evento_etiqueta);
    eliminar_eventos("modal_eliminar_item",delete_items,"click");
    tabla.innerHTML = generador_tabla_datos(datos,1);
    document.getElementsByClassName("datos_trabajo_modal")[0].innerHTML = "";
    document.getElementsByClassName("datos_trabajo_modal")[0].appendChild(tabla);
    cargar_eventos("selector_head_ubdate",evento_etiqueta);
    cargar_eventos("modal_eliminar_item",delete_items,"click");
    document.getElementsByClassName("datos_trabajo_modal")[0].style.filter = "none";  
    habilitar_editable("dragula"); 
};

function downloadArff2(datos){
  let titulo_Date = document.getElementById("titulo_archivo_date");
  let valores = "@relation Predecir \n";
  for (let i = 0; i < datos.length; i++) {
    let cant_datos = datos[i].length;
    if(i == 1) continue;
    for (let j = 0; j < cant_datos; j++) {
        if(i == 0){
          let datos_aux = "";
            if(datos[1][j] == "Class"){
              datos_aux = "{";
              datos1.get_clases(j).forEach(element => {
                datos_aux += `${element},`;
              });
              datos_aux = datos_aux.slice(0,-1);
              datos_aux += "}"; 
            }else{
              datos_aux = datos[1][j].toLowerCase();
            }

            valores += `@attribute ${datos[i][j]} ${datos_aux} \n`;
            continue;
        }
        valores += (j == cant_datos - 1)? `${datos[i][j]} \n`:`${datos[i][j]},`;
    }
    if(i == 0) valores+= "@data \n";
  }
  console.log(valores);
  let enlace  = document.createElement('a');
    enlace.setAttribute("href","data:text/plain;charset=utf-8,"+ encodeURIComponent(valores));
    enlace.setAttribute("download",`${titulo_Date.innerHTML}.arff`);
    enlace.style.display = "none";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
};