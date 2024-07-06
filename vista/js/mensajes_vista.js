$(document).ready(function(){
    $(document).on("click","#load_message_date",function(){
        let mensaje = document.getElementById("mensaje_texto");
        let date_pu_pri = document.getElementById("date_pu_pri");

        const datos = {
            valor_data:localStorage.getItem("valor_aux"),
            dato_radio:(date_pu_pri.checked)?2:1,
            mensaje:mensaje.value
        };
        $.ajax({
            url:"./modelo/tareas-date/mensajes_envio.php",
            type:"POST",
            data:datos,
            success:function(respuesta){
                if(respuesta == 1){
                    mensaje.value = "";
                    // comprobador.innerHTML = "enviado";
                }else{
                    // comprobador.innerHTML = "Error al enviar";
                }
            }
        });

    });
});


var cantidad_recarga = 0;
setInterval(cargar_mensajes,7000);
cargar_mensajes();
function cargar_mensajes(){
    (cantidad_recarga == 15)?location.reload():cantidad_recarga++; 
    $.ajax({
        url:"./modelo/tareas-date/cargar_mensajes.php",
        type:"POST",
        success:function(response){
            if(response != ""){
                const datos = JSON.parse(response);
                let datos1 = "";
                datos.forEach(element => {
                    datos1 += `
                        <div class="mensajes_data">
                            <div class="card">
                            <div class="card-header">
                                ${element.nombre_user}
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">comentario: </h5>
                                <p class="card-text">${element.comentario}</p>
                            </div>
                            </div>
                        </div>
                    `;
                });
                document.getElementById("tabla_mensajes").innerHTML = datos1;
            }
        }
    });
}