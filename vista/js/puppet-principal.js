//iniciador de cortaje
var archivos;
var pantalla_uso = false;
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
                    <button type="button" class="btn btn-primary boton_agregar_date">Agregar</button>
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
});

const btn_cerrarPuppet = document.querySelector("#btn_cerraPuppet");
const excel_input = document.getElementById("archivo_xlsx");
const puppet_test = document.querySelector("#contenido");

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
  console.log("enviando al servidor");
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

  let dato_prueba = {
      "datos":elementos,
      "titulo":nombre_archivo,
      "opcion":1,
      "user_date":localStorage.getItem("valor_aux")
  };
  console.log(dato_prueba);
  // return;
  $.ajax({
      url: './modelo/tareas-date/convertir_sql.php',
      type: 'POST', 
      data: dato_prueba, 
      success: function(response){
          if(response == "negado"){
              alert(`El nombre ${nombre_archivo} ya esta en uso , eliga otro por favor`);
          }else if(response == "exito"){
            alert("Subido con exito");
            location.reload();
          }
          console.log('Respuesta del servidor:', response);
      }
  });
})


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
  // let tabla = document.createElement("table");
  // tabla.classList.add("table");
  // tabla.classList.add("tabla_dato")
  // let datos = archivos;
  // let contenido  = `
                  
  //                 <thead>
  //                     <tr>
  //             `;
  // for (let i = 0; i < datos[0].length ; i++) {
  //     contenido +=`<th scope="col">${datos[0][i]}</th>`;
  // }
  // contenido += `
  //         </tr>
  //     </thead>
  //     <tbody>
  // `;
  // for (let i = 1; i < datos.length; i++){
  //     let contenido_dato = "<tr>";
  //     datos[i].forEach(element => {
  //         contenido_dato += `<td>${(element == "10101z")?"":element }</td>`;  
  //     });
  //     contenido_dato += "</tr>";
  //     contenido += contenido_dato;
  // }
  // contenido += "</tbody>"; 
  // tabla.innerHTML = contenido;
  // document.getElementById("tabla_contenido").innerHTML = "";
  // document.getElementById("tabla_contenido").appendChild(tabla); 
  // visibilidadElementos("flex");
  document.getElementById("tabla").innerHTML = "";
  let tabla = document.querySelector("#tabla");
  let datos = archivos;
  let contenido  = `
                  
                  <thead class="table-dark">
                      <tr>
              `;
  for (let i = 0; i < datos[0].length ; i++) {
      contenido +=`<th scope="col">${datos[0][i]}</th>`;
  }
  contenido += `
          </tr>
      </thead>
      <tbody>
  `;
  for (let i = 1; i < datos.length; i++){
      let contenido_dato = "<tr>";
      datos[i].forEach(element => {
          contenido_dato += `<td>${(element == "10101z")?"":element }</td>`;  
      });
      contenido_dato += "</tr>";
      contenido += contenido_dato;
  }
  contenido += "</tbody>"; 
  tabla.innerHTML = contenido;
  document.getElementById("tabla").innerHTML = contenido;
  // document.getElementById("tabla").appendChild(contenido); 
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