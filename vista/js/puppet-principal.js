//iniciador de cortaje
var archivos;
var pantalla_uso = false;
var titulo_archivo = "";
$(document).ready(function(){
    console.log("conectado");
    // console.log(archivos);
    // subir_archivos();
    $(document).on("click",".vistaTabla",function(e){
      let presionado = e.target;
      let name = presionado.getAttribute('name');
      if(name != null){
        location.href=`editor?archivo=${name}`;
      }
    });

    $(document).on("dblclick",".formato-editable",function(e){
      console.log("se ah tratado de editar");
      let elemento = $(this);
      let etiqueta = elemento.find("div");
      if(! etiqueta.is('div') ){
        console.log("no div");
        return;
      }
      let pos_x = elemento[0].dataset.x;
      let pos_y = elemento[0].dataset.y; 
      let contenido = etiqueta.text();
      console.log(`pos x ${pos_x} - pos y ${pos_y}`);

      let input = $("<input>").attr("type", `text`).val(contenido);
      etiqueta.replaceWith(input);
      input.focus();
      input.blur(function () {
        let nuevo_texto = input.val();
        let nuevo_div = $("<div>").text(nuevo_texto);
        input.replaceWith(nuevo_div);
      })
    });
    

    $(document).on("click","#archivo_nuevo",function(){
      let contenido_d = document.getElementById("contenido");
      // contenido_d.style.display = "block";
      visibilidadElementos("block");
      if(contenido_d.children[1].id == "tabla"){
        contenido_d.removeChild(contenido_d.children[1]);
        if(!pantalla_uso){
            pantalla_uso = true;
            let div_agregar = document.createElement("div");
            let texto = "";
  
            texto = `
                <div class="contenido_date_boton">
                    
                    <button type="button" class="btn btn-primary boton_agregar_date">Agregar Campo</button>
                </div>
                <div class="contenido_date_agregar card">
  
                </div>
            `;
            div_agregar.innerHTML = texto;
            div_agregar.id = "editable_date";
            contenido_d.insertBefore(div_agregar,contenido_d.children[1]);
        }
      }
  });

  // $("#tabla tbody").sortable({
  //   items:"tr",
  //   cursor:"move",
  //   update:function(event,ui){
  //     console.log("Se a movido la fila");
  //   }
  // });
  // $("#tabla tbody").disableSelection();
});

const btn_cerrarPuppet = document.querySelector("#btn_cerraPuppet");
const excel_input = document.getElementById("archivo_xlsx");
const puppet_test = document.querySelector("#contenido");
const archivo_arff = document.getElementById("archivo_arff");

archivo_arff.addEventListener("change",(event)=>{
    let archivo = event.target;
    if(archivo.files.length == 0) return console.log("ningun archivo cargado");

    let archivo2 = archivo.files[0];
    var reader = new FileReader();
    let elementos = Array();
    let principal = Array();
    reader.onload = async function(e) {
      let datos = e.target.result;
      let texto_aux = "";
      console.log(datos);
      const prueba_datos = ParseARFF(datos);
      titulo_archivo = prueba_datos.titulo[0][0];
      if(prueba_datos.attributes.length != 0){
        let aux_datos = Array();
        prueba_datos.attributes.forEach(element => {
          aux_datos.push(element[0]);
        });
        principal.push(aux_datos);
      }
      if(prueba_datos.instances.length != 0){
        prueba_datos.instances.forEach(datos => {
          elementos.push(datos);
        });
      }
      // archivos = principal;
      archivos = principal.concat(elementos);
      // console.log(prueba_datos);
      // console.log(principal);
      // console.log(elementos);
      console.log(archivos);
      vista_previa_datos();
    };
    reader.readAsText(archivo2); 
});
function visibilidadElementos(estado){
  puppet_test.style.display = estado;
  if(estado == "block") puppet_test.classList.add("animacion_suave_puppet");
}

visibilidadElementos("none");

btn_cerrarPuppet.addEventListener("click",function(){
  visibilidadElementos("none");
  puppet_test.classList.remove("animacion_suave_puppet");
})

excel_input.addEventListener("change",async function(e){
    const elemento = await readXlsxFile(excel_input.files[0]);
    // console.log(elemento);
    const excel = new Excel(elemento);
    const datos_excel = excel.content;
    archivos = datos_excel;
    convertidor_datos(datos_excel);
    vista_previa_datos();
});
// btn_agregar1.addEventListener("click",function(e){
//   visibilidadElementos("flex");
//   e.stopPropagation();
// })

botones_tabla.addEventListener("click",function(e){
  e.stopPropagation();
  let notificacion = new notficacion("contenedor-toast_date");
  let opciones_user = Array();
  if(pantalla_uso){
      let datos1  = document.getElementsByClassName("input_edit_add_value");
      let opciones = document.getElementsByClassName("opcion_selecionada_pop_up");
      if(datos1.length == 0) return ;
      let nuevo_dato = Array();
      let datos_archivo = Array();
      for(const elemento of  opciones){
        opciones_user.push(elemento.selectedIndex);
      }
      for (const key of datos1){
        if(key.value != ""){
          nuevo_dato.push(key.value);
        }else{
          notificacion.generador_text_valor({tipo:"error",titulo:'Error',descripcion:'No dejes campos vacios',tiempo:7000});
          notificacion.event_close_object();
          return;
        }
      }
      datos_archivo.push(nuevo_dato);
      archivos = datos_archivo;
  }
  // return;
  // console.log("enviando al servidor");
  // notificacion.generador_text_valor({tipo:"informacion",titulo:'Subiendo',descripcion:'Se esta subiendo al servidor',tiempo:7000,autocierre:true});
  // return;
  let nombre_archivo = prompt("Ingrese un nombre para el archivo");
  if(nombre_archivo == null || nombre_archivo == undefined){
    return;
  }
  // console.log(nombre_archivo);
  if(archivos == null){
    alert("Archivo vacio");
    return;
  }
  const elementos = JSON.stringify(archivos);
  const opciones = JSON.stringify(opciones_user);
  let dato_prueba = {
      "datos":elementos,
      "titulo":nombre_archivo,
      "opcion":1,
      "user_date":localStorage.getItem("valor_aux"),
      "opciones_user":opciones
  };
  // console.log(dato_prueba);
  // return;
  $.ajax({
      url: './modelo/tareas-date/convertir_sql.php',
      type: 'POST', 
      data: dato_prueba, 
      success: function(response){
          if(response == "negado"){
            notificacion.generador_text_valor({tipo:"error",titulo:'Error del nombre',descripcion:`el nombre ${nombre_archivo} ya esta en uso <br> elije otro`,tiempo:7000,autocierre:true});
              // alert(`El nombre ${nombre_archivo} ya esta en uso , eliga otro por favor`);
          }else if(response == "exito"){
            // alert("Subido con exito");
            notificacion.generador_text_valor({tipo:"exito",titulo:'Congrulations',descripcion:'Se Subio con exito',tiempo:7000,autocierre:true});
            // location.reload();
          }
          notificacion.event_close_object();
          console.log('Respuesta del servidor:', response);

      }
  });
  //pra volver editable un objeto
  $(document).on("dblclick",".editable_title",(e)=>{
      let elemento = $(this);
      console.log("se ha cliekado el objeto");
      let posicion = elemento[0].parentElement.classList[0];
      let nombre = elemento[0].attributes.name.value;
      let tipo = elemento[0].dataset.type;
      let posicion2 = 0;
      let valores_di = ["text","number","number","date","checkbox"];
      let respuesta_di = ["text","number","number","date","checkbox"];
      for(let i = 0;i < valores_di.length;i++){
          if(valores_di[i] == tipo){
              posicion2 = i;
              break;
          }
      }
      if(!posicion && !nombre ){
          console.log("falta mas datos para ser editable");
         return;
      }

      let etiqueta = elemento.find("div");
      let contenido = etiqueta.text();
      let input = $("<input>").attr("type", `${respuesta_di[posicion2]}`).val(contenido);
      etiqueta.replaceWith(input);
      input.focus();
  });
  
});


class Excel{
  constructor(content){
      this.content = content;
  }
}

function convertidor_datos(datos_excel){
  let datos = [];

  for (let i = 0; i < datos_excel.length; i++){
      let datos_aux = [];
      let activador = true;
      let cant_espacios = 0;
      let campo_vacio = 0;

      for (let u = 0; u < datos_excel[i].length; u++){

          if(activador){
              if(datos_excel[i][u] === null){
                  cant_espacios ++;
              }else{
                  activador = false;
              }
          }

          if(datos_excel[i][u] != null && u >= cant_espacios){
              datos_aux.push(datos_excel[i][u]);
          }else if(datos_excel[i][u] == null && u >= cant_espacios ){
              datos_excel[i][u] = "10101z";
              datos_aux.push(datos_excel[i][u]);

          }
          
      }
      if(datos_aux.length != 0){
          datos.push(datos_aux);
      }
      campo_vacio = 0;
  }
  archivos = datos;
  // console.log(archivos);
}
function vista_previa_datos(){
  let contenido_d =document.getElementById("contenido");
  let tabla; 
  let dato_activo = false;
  if(contenido_d.children[1].id != "tabla"){
    contenido_d.children[1].remove();
    // contenido_d.removeChild(contenido_d.children[1]);
    tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.classList.add("tabla_dato");
    tabla.id = "tabla";
    tabla.style.flexDirection = "column";
    dato_activo = true;
    pantalla_uso = false;
  }else{
    document.getElementById("tabla").innerHTML = "";
    tabla = document.querySelector("#tabla");
  }
  let datos = archivos;
  let contenido  = `
                  
                  <thead class="table-dark">
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
  for (let i = 1; i < datos.length; i++){
      let contenido_dato = "<tr>";
      let posicion_aux = 0;
      datos[i].forEach(element => {
          posicion_aux ++;
          contenido_dato += `<td class="formato-editable" data-x="${i}" data-y="${posicion_aux}" ><div>${(element == "10101z")?"":element }</div></td>`;  
      });
      contenido_dato += "</tr>";
      contenido += contenido_dato;
  }
  contenido += "</tbody>"; 
  tabla.innerHTML = contenido;
  if(dato_activo){
    contenido_d.insertBefore(tabla,contenido_d.children[1]);
  }else{
    document.getElementById("tabla").innerHTML = contenido;
  }
  // document.getElementById("tabla").appendChild(contenido); 
  dragula([document.getElementById('dragula')]);
  visibilidadElementos("block");
}

function reader1(){
  let texto = "";
  texto = `
      <section style="position: sticky; top: 0px; background: rgb(231, 231, 231); box-shadow: 3px 0px 7px black;" class="w-100 d-flex justify-content-between align-items-center rounded">
          <p style="overflow:auto;" class="fs-6 ps-3 fw-bolder text-nowrap">VISUALIZAR DATOS</p>
          <button id="btn_cerraPuppet" type="button" class="btn btn-danger">X</button>
      </section>
  `;
  return texto;
}
function reader2(){
  let texto = "";
  texto = `
      <section style="position: sticky; bottom: 10px;" class="botones_tabla d-flex justify-content-end me-2" id="botones_tabla">
          <button type="button" class="btn btn-success fs-5 f-">subir a la nube</button>
      </section>
  `;
  return texto;
}

function ParseARFF(content){
    const lines = content.split("\n");
    const data = {
        titulo:[],
        attributes: [],
        instances: []
    };

    let inDataSection = false;
    let attributeSectionEnded = false;

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith("%")) {
            return;
        }

        if (inDataSection && line.length > 0) {
          const values = line.split(",");
          data.instances.push(values);
        }
        let dato = line.toLowerCase(); 
        if(dato.startsWith("@relation")){
            const parts = line.split(/\s+/);
            const attributeName = [parts[1]];
            data.titulo.push(attributeName);
        }else if (dato.startsWith("@attribute")) {
            const parts = line.split(/\s+/);
            const attributeName = [parts[1],parts[2]];
            data.attributes.push(attributeName);
        }else if (dato.startsWith("@data")) {
            inDataSection = true;
            attributeSectionEnded = true;
        }
    });

    return data;
}


