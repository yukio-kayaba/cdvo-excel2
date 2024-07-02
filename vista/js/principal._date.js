$(document).ready(function(){
    valores_usuario();
    nombre_user();

    let activo = true;
    $(document).on("click",".boton_redondo_datos1",function(){
        // (activo)?false:true;
        let dato_info = document.getElementsByClassName("boton_redondo_datos1")[0];
        let casillas = document.getElementsByClassName("tablas_opciones");
        console.log("cliekado");
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

    function valores_usuario(){
        const valores = localStorage.getItem("valor_aux");
        const datos_tablas = document.getElementsByClassName("tablas_disponibles")[0];

        $.ajax({
            url:"./modelo/tareas-date/get_datos_user.php",
            type:"POST",
            data:{valores},
            success:function(response){
                // console.log(response);
                if(response != ""){
                    const datos_tabla = JSON.parse(response);
                    // console.log(datos_tabla);
                    let texto = "";
                    datos_tabla.forEach(element => {
                        texto += `
                            <article class="vistaTabla">
                                <p>
                                ${element[1]}
                                </p>
                                <div name="${element[0]}">
                                    <img name="${element[0]}" src="./vista/img/ver_hoha.png" alt="">
                                </div>
                            </article>
                        `;
                    });
                    // console.log(texto);
                    
                    datos_tablas.innerHTML = texto;
                }
            }    
        })
    }
    function nombre_user(){
        const valores = localStorage.getItem("valor_aux");

        $.ajax({
            url:"./modelo/tareas-date/nombre_user.php",
            type:"POST",
            data:{valores},
            success:function(response){
                // console.log(response);
                $("#nombre_user").html(`Bienvenido ${response}`);
            }    
        })
    }
    $(document).on("click",".boton_agregar_date",function(){
        let elemento_dato = document.createElement("div");
        elemento_dato.classList.add("input-group");
        elemento_dato.classList.add("mb-3");
        elemento_dato.classList.add("cotenido-date-puppet");
        elemento_dato.innerHTML = `
            <input type="text" class="form-control" placeholder="Ingrese el Texto" aria-label="Recipient's username" aria-describedby="button-addon2">
            <button class="btn btn-outline-danger" type="button" id="button-addon2">Eliminar</button>
        `;
        document.getElementsByClassName("contenido_date_agregar")[0].appendChild(elemento_dato);
        console.log("cliekado");
    });
});
