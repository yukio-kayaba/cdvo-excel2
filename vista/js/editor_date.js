// const { saveAs } = require("./vista/js/fileSaver.js");

var informacion_archivos;
$(document).ready(function(){
    carga_tablero();
    agregar_titulo();
    let activo = true;
    function carga_tablero(){
        let dato = document.getElementById("dato_id_archivo");
        let valor_aux = localStorage.getItem("valor_aux");
        const datos = {
            "archivo":dato.innerHTML,
            "valores":valor_aux
        }
        $.ajax({
            url: './modelo/tareas-date/obtencion_archivos.php',
            type: 'POST', 
            data: datos, 
            success: function(response){
                // console.log('Respuesta del servidor:', response);
                if(response != ""){
                    const datos1 = JSON.parse(response);
                    informacion_archivos = datos1;
                    vista_previa_datos(datos1,"tabla_datos_principal"); 
                }
            }
        })
        // console.log(dato.innerHTML);

    }

    $(document).on("click","#btnExportar",function(){
        descargar_archivos();
        console.log("clikeado");
    });

    $(document).on("click",".boton_redondo_datos",function(){
        // (activo)?false:true;
        let dato_info = document.getElementsByClassName("boton_redondo_datos")[0];
        let casillas = document.getElementsByClassName("conteiner_btnCambio");
        if(activo){
            dato_info.innerHTML = "-";
            casillas[0].style.visibility = "visible";
            activo = false;
        }else{
            dato_info.innerHTML = "+";
            casillas[0].style.visibility = "hidden";
            activo = true;
        }
    });

    function agregar_titulo(){
        const elemento_title = document.getElementById("titulo_archivo_date");
        let dato = document.getElementById("dato_id_archivo");
        let valor_aux = localStorage.getItem("valor_aux");
        const datos = {
            "archivo":dato.innerHTML,
            "valores":valor_aux
        }
        $.ajax({
            url: './modelo/tareas-date/get_titulo_archivo.php',
            type: 'POST', 
            data: datos, 
            success: function(response){
                // console.log('Respuesta del servidor:', response);
                if(response != ""){
                    elemento_title.innerHTML = response;
                }
            }
        })
    }

})

function vista_previa_datos(archivos,id_dato){
    let tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.id = "tabla";
    let datos = archivos;
    let contenido  = `
                    <thead class="table-dark">
                        <tr>
                `;
    for (let i = 1; i < datos[0].length ; i++) {
        contenido +=`<th scope="col">${datos[0][i]}</th>`;
    }
    contenido += `
            </tr>
        </thead>
        <tbody>
    `;
    for (let i = 1; i < datos.length; i++){
        let contenido_dato = `<tr class='${datos[i][0]}'>`;
        datos[i].forEach((element,indice)=> {
            if(indice != 0){
                contenido_dato += `<td>${(element == "10101z")?"":element }</td>`;  
            }
        });
        contenido_dato += "</tr>";
        contenido += contenido_dato;
    }
    contenido += "</tbody>"; 
    tabla.innerHTML = contenido;
    document.getElementById(id_dato).innerHTML = "";
    document.getElementById(id_dato).appendChild(tabla); 
}
function descargar_archivos(){
    const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENCION = ".xlsx";
    let titulo_Date = document.getElementById("titulo_archivo_date");
    const worshet = XLSX.utils.json_to_sheet(informacion_archivos);
    const workbook = {Sheets:{
        'data':worshet
    },SheetNames:['data']};

    const excelBuffer = XLSX.write(workbook,{bookType:"xlsx",type:"array"});
    console.log(excelBuffer);
    guardar_excel(excelBuffer,titulo_Date.innerHTML);
}
function guardar_excel(buffer,filename){
    const EXCEL_EXTENCION = ".xlsx";
    const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    const data = new Blob([buffer],{type:EXCEL_TYPE});
    saveAs(data,filename +EXCEL_EXTENCION);
}

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

btn_agregar.addEventListener("click", function(e){
    const element_date = document.createElement("div");
    let titulo_Date = document.getElementById("titulo_archivo_date");
    element_date.classList.add("modales");

    let texto = `
        <div class="mb-3 celda_datos">${titulo_Date.innerHTML}</div>
        <br/>
    `;
    // let dato_value = (valores_repeat != "" && indice - 1 == valores_key[indice])? valores_repeat[indice - 1]:"";
    informacion_archivos[0].forEach((element,indice) => {
        if(indice!= 0){
            texto += `
                <div class="mb-3 celda_datos">
                    <label for="inputPassword${indice}" class="col-form-label">${element}</label>
                    <input type="text" id="inputPassword${indice}" name="${indice}" class="form-control datos_input_date" aria-describedby="passwordHelpInline" >
                    <div class="form-check">
                        <input class="radio_duple_save" class="form-check-input" type="checkbox" name="${indice}" value="" id="flexCheckDefault${indice}">
                        <label class="form-check-label" for="flexCheckDefault${indice}">
                            Repetir
                        </label>
                    </div>
                </div>
            `;
        }
    });


    element_date.innerHTML = texto;
    tabla_contenido.innerHTML ="";
    tabla_contenido.appendChild(element_date);
    botones_tabla.classList.add("datos_escribidos");
  visibilidadElementos("flex");
  autocompletado();
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
    let dato = document.getElementById("dato_id_archivo");
    let valor_aux = localStorage.getItem("valor_aux");
    let dato_activo = false;
    let datos;
    botones_tabla.classList.forEach(element => {
        if(element == "datos_escribidos") dato_activo=true;
    });
    console.log(dato_activo);
    let url = "";
    if(dato_activo){
        datos = obtencion_datos_input();
        let datos_2 = {
            "archivo":dato.innerHTML,
            "informacion":JSON.stringify(datos),
            "date_user":valor_aux
        };
        datos = datos_2;
        url = './modelo/tareas-date/enviar_datos_per.php';
        console.log(datos);
    }else{

    }
    $.ajax({
        url: url,
        type: 'POST', 
        data: datos, 
        success: function(response){
            if(response == "enviado"){
                console.log('Respuesta del servidor:', response);
                alert("EL ARCHIVO SE SUBIO CON EXITO");
            }else{
                alert("error data");
            }
            location.reload();
        }
    })

  e.stopPropagation();
})
function obtencion_datos_input(){
    const radios_date = document.getElementsByClassName("radio_duple_save");
    const input_date = document.getElementsByClassName("datos_input_date");
    let datos = [];
    let radios ={};
    for (let i = 0; i < input_date.length; i++){
        datos.push(input_date[i].value);   
        if(radios_date[i].checked){
            radios[i] = input_date[i].value;
        }
    }
    localStorage.setItem("valores_repeat",JSON.stringify(radios));
    return datos;
}
puppetTabla.addEventListener("click", function(e){

  sombraTabla.style.display = "none";
  puppetTabla.style.display = "none";
  e.stopPropagation();
});


function autocompletado(){
    const radios_date = document.getElementsByClassName("radio_duple_save");
    const input_date = document.getElementsByClassName("datos_input_date");
    let valores_repeat = "";
    let valores_key = "";
    try {
        valores_repeat = localStorage.getItem("valores_repeat");
        valores_repeat = JSON.parse(valores_repeat);
        valores_key = Object.keys(valores_repeat);
    } catch (e) {
        valores_repeat = "";
    }
    // console.log(valores_repeat);

    for (const key in valores_repeat) {
        radios_date[key].checked = true;
        input_date[key].value = valores_repeat[key];
    }
}