$(document).ready(function(){
    carga_tablero();

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
                    const datos = JSON.parse(response);
                    vista_previa_datos(datos,"tabla_datos_principal"); 
                }
            }
        })
        // console.log(dato.innerHTML);

    }    
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
                    <thead>
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
        let contenido_dato = `<tr class='${datos[0][i]}'>`;
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