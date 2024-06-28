$(document).ready(function(){
    valores_usuario();
    nombre_user();
    
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
                    console.log(datos_tabla);
                    let texto = "";
                    datos_tabla.forEach(element => {
                        texto += `
                            <article class="vistaTabla">
                                <p name="${element[0]}">
                                ${element[1]}
                                </p>
                                <div>
                                <!-- esto siempre está vacio -->
                                </div>
                            </article>
                        `;
                    });
                    console.log(texto);
                    
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
                console.log(response);
                $("#nombre_user").html(`Bienvenido ${response}`);
            }    
        })
    }
});