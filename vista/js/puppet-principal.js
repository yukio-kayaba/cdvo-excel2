//iniciador de cortaje
var archivos;
$(document).ready(function(){
    console.log("conectado");
    // console.log(archivos);
    // subir_archivos();
    $(document).on("click",".vistaTabla",function(e){
      let presionado = e.target;
      let name = presionado.getAttribute('name');
      console.log("clickeado");
      location.href=`editor?archivo=${name}`;
    });
    // $(document).on("click","#servidor",function(){
    //     console.log("enviando");
    //     if(archivos == null){
    //         alert("Archivo vacio");
    //         return;
    //     }
    //     const elementos = JSON.stringify(archivos);

    //     let dato_prueba = {
    //         "datos":elementos,
    //         "titulo":"archivo_excel",
    //         "opcion":1,
    //         "user_date":1
    //     };
    //     console.log(dato_prueba);
    //     // return;
    //     $.ajax({
    //         url: './modelo/tareas-date/convertir_sql.php',
    //         type: 'POST', 
    //         data: dato_prueba, 
    //         success: function(response){
    //             console.log('Respuesta del servidor:', response);
    //         }
    //     });
    // }); 
});


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
// var archivos;
visibilidadElementos("none");

const excel_input = document.getElementById("agregar_archivo1");

excel_input.addEventListener("change",async function(e){
    const elemento = await readXlsxFile(excel_input.files[0]);
    // console.log(elemento);
    const excel = new Excel(elemento);
    const datos_excel = excel.content;
    // archivos = datos_excel;
    convertidor_datos(datos_excel);
    vista_previa_datos();
});
// btn_agregar1.addEventListener("click",function(e){
//   // visibilidadElementos("flex");
//   e.stopPropagation();
// })

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
      "user_date":1
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
          }else {
            alert("Subido con exito");
            location.reload();
          }
          console.log('Respuesta del servidor:', response);
      }
  });
})
puppetTabla.addEventListener("click", function(e){
  sombraTabla.style.display = "none";
  puppetTabla.style.display = "none";
  e.stopPropagation();
});


class Excel{
  constructor(content){
      this.content = content;
  }
}

// function subir_archivos(){
//   const excel_input = document.getElementById("archivo");
//   excel_input.addEventListener("change",async function(e){
//       const elemento = await readXlsxFile(excel_input.files[0]);
//       // console.log(elemento);
//       const excel = new Excel(elemento);
//       const datos_excel = excel.content;
//       // archivos = datos_excel;
//       convertidor_datos(datos_excel);
//       vista_previa_datos();
//   });
// }

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

}
function vista_previa_datos(){
  let tabla = document.createElement("table");
  tabla.classList.add("table");
  tabla.classList.add("tabla_dato")
  let datos = archivos;
  let contenido  = `
                  
                  <thead>
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
  document.getElementById("tabla_contenido").innerHTML = "";
  document.getElementById("tabla_contenido").appendChild(tabla); 
  visibilidadElementos("flex");
}