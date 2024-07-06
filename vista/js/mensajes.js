$(document).ready(function(){

    $(document).on("click","#btn_load_mensaje",function(){
        let dato = document.getElementsByClassName("valor_radio");
        let mensaje = document.getElementById("message-text");
        let tipo_dato = (dato[0].checked)?1:2;  
        let comprobador = document.getElementById("comprobador_mensaje");
        comprobador.innerHTML = "enviando ..";
        const datos = {
            valor_data:localStorage.getItem("valor_aux"),
            dato_radio:tipo_dato,
            mensaje:mensaje.value
        };
        $.ajax({
            url:"./modelo/tareas-date/mensajes_envio.php",
            type:"POST",
            data:datos,
            success:function(respuesta){
                if(respuesta == 1){
                    mensaje.value = "";
                    comprobador.innerHTML = "enviado";
                }else{
                    comprobador.innerHTML = "Error al enviar";
                }
            }
        });
    });

    $('.valor_radio').change(function(e){
        
        let obj1 =  document.getElementById("imagen1");
        let obj2 = document.getElementById("imagen2");

        if(this.checked){
            if(this.id == "flexRadioDefault1"){
                obj1.classList.add("check_fondo_activado");
                obj1.classList.remove("check_fondo_desactivado");
                obj2.classList.remove("check_fondo_activado");
                obj2.classList.add("check_fondo_desactivado");
            }else{
                obj2.classList.remove("check_fondo_desactivado");
                obj2.classList.add("check_fondo_activado");
                obj1.classList.add("check_fondo_desactivado");
                obj1.classList.remove("check_fondo_activado");
            }
        }
    });
});