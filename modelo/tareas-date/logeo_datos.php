<?php
    require_once("../modelo_sql.php");
    require_once("../configuracion.php");

    if(isset($_POST['dni'])){

        $dni = $_POST['dni'];
        if(preg_match('/^\d+$/', $dni)){
            $conexion = new Modelo(user,bd_date,password);
            $contra = $_POST['contrasenia'];
            $resultado = $conexion->validador_cuenta($dni,$contra);
            if($resultado[0] > 0){
                session_start();
                $_SESSION['id_user'] = $resultado[0];
                print_r($resultado[0]);
            }else{
                print(-4);
            }
        }else{
            print(-5);
        }
    }else{
        print(-1);
    }
?>