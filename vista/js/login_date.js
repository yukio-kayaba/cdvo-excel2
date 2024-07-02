$(document).ready(function(){
    var elemento_click = true;
    $(document).on("click","#create_count",function(){
        let texto = `
            <input type="text" name="" id="dni" placeholder="dni">
            <input type="password" name="" id="contra" placeholder="contraseña">

            <input type="submit" value="Iniciar Secion">
            <div class="border"></div>
            <p class="create-pages" id="create_count"><i>Crear cuenta</i></p>
        `;
        let texto1 = `
            <input type="text" name="" id="nombre" placeholder="nombre">
            <input type="text" name="" id="dni" placeholder="dni">
            <input type="password" name="" id="contra" placeholder="contraseña">

            <input type="submit" value="Validar Cuenta">
            <div class="border"></div>
            <p class="create-pages" id="create_count"><i>Iniciar secion</i></p>
        `;
        if(elemento_click){
            document.getElementsByClassName("cuadro_texto")[0].style.height = "70%";
            document.getElementById("login-form").innerHTML = texto1;
            elemento_click = false;
        }else{
            document.getElementsByClassName("cuadro_texto")[0].style.height = "60%";
            document.getElementById("login-form").innerHTML = texto;
            elemento_click = true;
        }

    });

    $('#login-form').submit(function (e){
        e.preventDefault();
        let  valor_pas = document.getElementById('contra').value;
        const postdata = {
            nombre:(!elemento_click)?$("#nombre").val():"",
            dni:$('#dni').val(),
            contrasenia:$("#contra").val()
        };
        let direccion = `./modelo/tareas-date/${(elemento_click)?"logeo_datos.php":"registro_datos.php"}`;
        console.log(direccion);
        console.log(postdata);
        // return;
        $.post(direccion,postdata,function(response){
            // console.warn("error al iniciar la secion");
            const datos = response;
            if(datos > 0){
                document.getElementsByClassName("border")[0].innerHTML = "Datos Correctos";
                localStorage.setItem("valor_aux",datos);
                window.location.reload();
            }else if(datos == -2){
                document.getElementsByClassName("border")[0].innerHTML = "DNI Incorrecto";
            }else if(datos == -3){
                document.getElementsByClassName("border")[0].innerHTML = "Este DNI ya esta en uso";
            }else if(datos == -4){
                document.getElementsByClassName("border")[0].innerHTML = "Datos Incorrectos";
            }else if(datos == -5){
                document.getElementsByClassName("border")[0].innerHTML = "No es un DNI";
            } else{
                // window.location.reload();
            }
        });
    });
});