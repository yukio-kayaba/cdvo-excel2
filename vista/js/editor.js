var archivos;
$(document).ready(function(){
    console.log("conectado");
    // console.log(archivos);
    subir_archivos();

    $(document).on("click","#servidor",function(){
        console.log("enviando");
        if(archivos == null){
            alert("Archivo vacio");
            return;
        }
        const elementos = JSON.stringify(archivos);

        let dato_prueba = {
            "datos":elementos,
            "titulo":"archivo_excel",
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
                console.log('Respuesta del servidor:', response);
            }
        });
    }); 
});

class Excel{
    constructor(content){
        this.content = content;
    }
}

function subir_archivos(){
    const excel_input = document.getElementById("archivo");
    excel_input.addEventListener("change",async function(e){
        const elemento = await readXlsxFile(excel_input.files[0]);
        // console.log(elemento);
        const excel = new Excel(elemento);
        const datos_excel = excel.content;
        // archivos = datos_excel;
        convertidor_datos(datos_excel);
        vista_previa_datos();
    });
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

}
function vista_previa_datos(){
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
    
    document.getElementById("tabla").appendChild(tabla); 
}
