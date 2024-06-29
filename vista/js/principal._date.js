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
                                <p name="${element[0]}">
                                ${element[1]}
                                </p>
                                <div name="${element[0]}">
                                <!-- esto siempre está vacio -->
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
});