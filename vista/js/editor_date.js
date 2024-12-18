
var informacion_archivos;
var archivos;
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
    $(document).on("click","#btnExportar_arff",()=>{
        vista_previa_datos2(informacion_archivos);
        
        // descargarARFF();
    });

    $(document).on("dblclick",".etiqueta_prueba",function(e){
        let elemento = $(this);
        // console.log();
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
        // console.log(tipo);
        // console.log(posicion);
        let etiqueta = elemento.find("div");
        let contenido = etiqueta.text();
        let input = $("<input>").attr("type", `${respuesta_di[posicion2]}`).val(contenido);
        etiqueta.replaceWith(input);
        input.focus();
        
        let dato1 = document.getElementById("titulo_archivo_date");
        
        input.blur(function(){
            let nuevo_texto = input.val();
            let nuevo_div = $("<div>").text(nuevo_texto);
            input.replaceWith(nuevo_div);
            let notificacion = new notficacion("contenedor-toast_date");
            // console.log(notificacion.get_iconos_date());
            const valores = {
                "archivo": dato1.innerHTML,
                "fila":posicion,
                "columna":nombre,
                "contenido":nuevo_texto
            }
            console.log(valores);
            if(nuevo_texto != contenido){
                $.ajax({
                    url: './modelo/tareas-date/actualizar_tabla.php',
                    type: 'POST', 
                    data: valores, 
                    success: function(response){
                        console.log('Respuesta del servidor:', response);
                        if(response == "listo"){
                            notificacion.generador_text_valor({tipo:"exito",titulo:'Exito',descripcion:'Se actualizo ' + nuevo_texto,tiempo:3000,autocierre:true});
                        }
                    }
                });
            }
        })
    });

    $(document).on("click",".boton_redondo_datos",function(){
        // (activo)?false:true;
        let dato_info = document.getElementsByClassName("boton_redondo_datos")[0];
        let casillas = document.getElementsByClassName("botones_opciones");
        if(activo){
            dato_info.innerHTML = "-";
            casillas[0].style.height = "60%";
            casillas[0].style.visibility = "visible";
            activo = false;
        }else{
            dato_info.innerHTML = "+";
            casillas[0].style.height = "20%";
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

    
});

const excel_input = document.getElementById("btn-subirArchivo");

excel_input.addEventListener("change",async function(e){
    let botones_tabla1 = document.getElementById("botones_tabla");
    const elemento = await readXlsxFile(excel_input.files[0]);
    // console.log(elemento);
    const excel = new Excel(elemento);
    const datos_excel = excel.content;
    archivos = datos_excel;
    convertidor_datos(datos_excel);
    vista_previa_datos(datos_excel,"campos_tabla");
    visibilidadElementos("flex");
    botones_tabla1.classList.remove("datos_escribidos");
    botones_tabla1.classList.add("botones_input_grade");
});

function vista_previa_datos(archivos,id_dato){
    let tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.id = "tabla";
    let datos = archivos;
    let contenido  = `
                    <thead class="table-dark tabla_dato_cabecera">
                        <tr>
                `;
    for (let i = 1; i < datos[0].length ; i++) {
        contenido +=`<th scope="col">${datos[0][i]}</th>`;
    }
    contenido += `
            <th scope="col">Opciones</th>
            </tr>
        </thead>
        <tbody>
    `;
    for (let i = 2; i < datos.length; i++){
        let contenido_dato = `<tr class='${datos[i][0]}'>`;
        datos[i].forEach((element,indice)=> {
            if(indice != 0){
                contenido_dato += `<td data-type="${datos[1][indice]}"  name="${datos[0][indice]}" class="etiqueta_prueba"><div>${(element == "10101z")?"":element }</div></td>`;  
            }
        });
        contenido_dato += `
            <td class="botones_tabla_edit">
            <button type="button" class="btn btn-info">
                <img src="./vista/img/graficos/edit_file_date.png" alt="" width="15px">
            </button>
            <button type="button" class="btn btn-danger">
                <img src="./vista/img/graficos/delete.png" alt="" width="15px">
            </button>
            </td>
        `;
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
    let elementos = [];
    for (let i = 0; i < informacion_archivos.length; i++) {
        let elemento_aux = [];
        for (let u = 1; u < informacion_archivos[i].length; u++) {
            elemento_aux.push(informacion_archivos[i][u]); 
        }
        elementos.push(elemento_aux);
    }
    console.log(elementos);
    const worshet = XLSX.utils.json_to_sheet(elementos);
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

function descargarARFF(){
    let titulo_Date = document.getElementById("titulo_archivo_date");
    let valores = "@relation Predecir \n";
    let valores_select = ["string","integer","real","date","{true,false}"];
    let valores_di = ["varchar(345)","int(11)","decimal","date","TINYINT"];
    for (let i = 0; i < informacion_archivos.length; i++) {
        let cant_datos = informacion_archivos[i].length;
        if(i == 1) continue;
        for (let j = 0; j < cant_datos; j++) {
            if(i == 0){
                let tipo_var;
                for (let u = 0; u < valores_di.length; u++) {
                    if(informacion_archivos[1][j] == valores_di[u]){
                        tipo_var = valores_select[u];
                        break;
                    }
                }
                valores += `@attribute ${informacion_archivos[i][j]} ${tipo_var} \n`;
                continue;
            }
            valores += (j == cant_datos - 1)? `${informacion_archivos[i][j]} \n`:`${informacion_archivos[i][j]},`;
        }
        if(i == 0) valores+= "@data \n";
    }
    console.log(valores);
    // let enlace  = document.createElement('a');
    // enlace.setAttribute("href","data:text/plain;charset=utf-8,"+ encodeURIComponent(valores));
    // enlace.setAttribute("download",`${titulo_Date.innerHTML}.arff`);
    // enlace.style.display = "none";
    // document.body.appendChild(enlace);
    // enlace.click();
    // document.body.removeChild(enlace);
}

let puppetTabla = document.querySelector("#puppet-tabla");
let sombraTabla = document.querySelector("#sombra_puppet");
let botones_tabla = document.querySelector("#botones_tabla");

let btn_agregar = document.querySelector("#btn_agregar");
let seccion_camposTabla = document.querySelector("#campos_tabla");

function visibilidadElementos(estado){
  puppetTabla.style.display = estado;
  sombraTabla.style.display = estado;
  botones_tabla.style.display = estado;
}

visibilidadElementos("none");

btn_agregar.addEventListener("click", function(e){
    const element_date = document.createElement("div");
    let titulo_Date = document.getElementById("titulo_archivo_date");
    element_date.classList.add("modales");
    element_date.style.width = "100%";

    let texto = `
        <div class="texto_centrado  fs-2">${titulo_Date.innerHTML}</div>
    `;
    // let dato_value = (valores_repeat != "" && indice - 1 == valores_key[indice])? valores_repeat[indice - 1]:"";
    let valores_di = ["varchar(345)","int(11)","decimal","date","tinyint"];
    let respuesta_di = ["text","number","number","date","checkbox"];
    let posicion2 = 0;
    let iterador = 0;
    informacion_archivos[0].forEach((element,indice) => {
        for(let i = 0;i < valores_di.length;i++){
            if(valores_di[i] == informacion_archivos[1][iterador]){
                posicion2 = i;
                break;
            }
        }
        if(indice != 0){
            texto += `
                <div class="campos_de_tabla_rellenar">
                    <label for="inputPassword${indice}" class="fs-5 col-form-label">${element}</label>
                    <input type="${respuesta_di[posicion2]}" id="inputPassword${indice}" name="${indice}" class="form-control datos_input_date" aria-describedby="passwordHelpInline" >
                    <div class="form-check">
                        <input class="form-check-input" class="form-check-input" type="checkbox" name="${indice}" value="" id="flexCheckDefault${indice}">
                        <label class="form-check-label radio_duple_save" for="flexCheckDefault${indice}">
                            Recordar para la siguiente
                        </label>
                    </div>
                </div>
            `;
        }
        iterador ++;
    });
    element_date.innerHTML = texto;
    seccion_camposTabla.innerHTML = "";
    seccion_camposTabla.appendChild(element_date);
    botones_tabla.classList.add("datos_escribidos");
    visibilidadElementos("flex");
    autocompletado();
    e.stopPropagation();
})

sombraTabla.addEventListener("click", function(e){
  visibilidadElementos("none");
  e.stopPropagation();
});
//boton de envio de datos
botones_tabla.addEventListener("click",function(e){
    let dato = document.getElementById("dato_id_archivo");
    let valor_aux = localStorage.getItem("valor_aux");
    let dato_activo = false;
    let datos,informacio;
    let notificacion = new notficacion("contenedor-toast_date");
    console.log(notificacion.get_iconos_date());

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
        informacio = datos;
        datos = datos_2;
        url = './modelo/tareas-date/enviar_datos_per.php';
        // console.log(datos_2);
        // botones_tabla.classList.remove("datos_escribidos");
    }else{
        let datos_2 = {
            "titulo":dato.innerHTML,
            "datos":JSON.stringify(archivos),
            "user_date":valor_aux,
            "opcion":2
        };
        url = './modelo/tareas-date/convertir_sql.php';
        datos = datos_2;
    }
    $.ajax({
        url: url,
        type: 'POST', 
        data: datos, 
        success: function(response){
            if(response == "enviado" || response == "exito"){
                console.log('Respuesta del servidor:', response);
                // alert("EL ARCHIVO SE SUBIO CON EXITO");

                console.log(informacio);
                let celda = document.createElement("tr");
                let cantidad_aux = informacion_archivos.length - 1;
                celda.setAttribute('class',`${cantidad_aux}`);
                for (let index = 0; index < informacio.length; index++) {
                    let cantidad = document.getElementById("tabla").rows.length;
                    let td = document.createElement("td"); // Crear la celda
                    td.setAttribute("name", cantidad);
                    td.className = "etiqueta_prueba";
                    td.innerHTML = `<div>${(informacio[index] == "10101z") ? "" : informacio[index]}</div>`;
                    celda.appendChild(td); // Agrega la celda a la fila
                }
                informacio.unshift(`${cantidad_aux}`);
                informacion_archivos.push(informacio);
                celda.innerHTML += `
                    <td class="botones_tabla_edit">
                    <button type="button" class="btn btn-info">
                        <img src="./vista/img/graficos/edit_file_date.png" alt="" width="15px">
                    </button>
                    <button type="button" class="btn btn-danger">
                        <img src="./vista/img/graficos/delete.png" alt="" width="15px">
                    </button>
                    </td>
                `;
                let tabla_aux = document.getElementById("tabla").getElementsByTagName("tbody")[0];
                tabla_aux.appendChild(celda);

                notificacion.generador_text_valor({tipo:"exito",titulo:'Exito',descripcion:'El archivo se subio con exito',tiempo:7000,autocierre:true});
            }else{
                // alert("error data");
                notificacion.generador_text_valor({tipo:"error",titulo:'Error',descripcion:'Error al subir el archivo',tiempo:7000,autocierre:true});
            }
            notificacion.event_close_object();
            // location.reload();
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

//   sombraTabla.style.display = "none";
//   puppetTabla.style.display = "none";
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