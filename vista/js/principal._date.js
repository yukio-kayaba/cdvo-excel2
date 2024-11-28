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
                    if(datos_tabla.length != 0){
                        datos_tabla.forEach(element => {
                            texto += `
                                <article class="vistaTabla">
                                    <div class="vista_tabla_parrafo">
                                        <img src="./vista/img/graficos/delete_file.png" alt="" width="20px">
                                        <p>${element[1]}</p>
                                        <img src="./vista/img/graficos/file.png" alt="" width="20px">
                                    </div>
                                    <div name="${element[0]}">
                                        <img name="${element[0]}" src="./vista/img/graficos/file_view.png" alt="">
                                    </div>
                                </article>
                            `;
                        });
                        
                        datos_tablas.innerHTML = texto;
                    }
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
        let tipos_datos = ["string","integer","real","date","boolean"];
        elemento_dato.classList.add("input-group");
        elemento_dato.classList.add("mb-3");
        elemento_dato.classList.add("cotenido-date-puppet");
        elemento_dato.classList.add("animacion_suave_puppet");
        elemento_dato.innerHTML = `
            <input type="text" class="form-control input_edit_add_value" placeholder="Ingrese el campo " aria-label="Recipient's username" aria-describedby="button-addon2">
            ${opciones_text(tipos_datos)}
            <button class="btn btn-outline-danger boton_eliminar_edit_date" type="button" >Eliminar</button>
        `;
        document.getElementsByClassName("contenido_date_agregar")[0].appendChild(elemento_dato);
    });
    $(document).on("click",".boton_eliminar_edit_date",function(e){
        let objeto_edit = e.target;
        objeto_edit.parentElement.classList.add("animacion_cerrar_puppet");
        objeto_edit.parentElement.addEventListener("animationend",function(e){
            if(e.animationName == "eliminar"){
                objeto_edit.parentElement.removeEventListener('animationend',this);
                objeto_edit.parentElement.remove();
            }
        });
    });
    function opciones_text(valores = null){
        let texto = "";
        if(!Array.isArray(valores)) return false;
        texto += `
            <div>
            <select  class="form-select quit_border opcion_selecionada_pop_up" aria-label="Large select example">
        `;
        valores.forEach(dato1 => {
            texto += `
                <option value="${dato1}" >${dato1}</option> 
            `;
        });
        texto += `
                </select>
            </div>
        `;
        return texto;
    }
});