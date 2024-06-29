$(document).ready(function(){
    carga_tablero();

    function carga_tablero(){
        let dato = document.getElementById("dato_id_archivo");
        let valor_aux = localStorage.getItem("valor_aux");
        
        // console.log(dato.innerHTML);

    }    
})

function vista_previa_datos(archivos){
    let tabla = document.createElement("table");
    let datos = archivos;
    let contenido  = `
                    <caption>
                        Vista previa de datos
                    </caption>
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
    
    document.getElementById("tabla_contenido").appendChild(tabla); 
}