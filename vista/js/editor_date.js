// const { saveAs } = require("./vista/js/fileSaver.js");

var informacion_archivos;
$(document).ready(function(){
    carga_tablero();
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
})

function vista_previa_datos(archivos,id_dato){
    let tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.id = "tabla";
    let datos = archivos;
    let contenido  = `
                    <caption>
                        Vista previa de datos
                    </caption>
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
    const worshet = XLSX.utils.json_to_sheet(informacion_archivos);
    const workbook = {Sheets:{
        'data':worshet
    },SheetNames:['data']};

    const excelBuffer = XLSX.write(workbook,{bookType:"xlsx",type:"array"});
    console.log(excelBuffer);
    guardar_excel(excelBuffer,"myfile_prueba");
}
function guardar_excel(buffer,filename){
    const EXCEL_EXTENCION = ".xlsx";
    const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    const data = new Blob([buffer],{type:EXCEL_TYPE});
    saveAs(data,filename + new Date().getTime()+EXCEL_EXTENCION);
}