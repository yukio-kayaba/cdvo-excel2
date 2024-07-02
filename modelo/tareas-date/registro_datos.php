<?php
    require_once("../modelo_sql.php");
    require_once("../configuracion.php");

    if(isset($_POST['dni'])){
        $conexion = new Modelo(user,bd_date,password);
        $dni = $_POST['dni'];
        $dni = str_replace(" ",'',$dni);
        if(strlen($dni) == 8){
            $error = 0;
            for ($i=0; $i < 8; $i++) { 
                if(!is_numeric($dni[$i])){
                    $error ++;
                }
            }
            if($error == 0){
                $contra = $_POST['contrasenia'];
                $dato = $_POST['nombre'];
                $resultado = $conexion->get_tabla_colum("SELECT dni FROM usuarios_ficher_0001_z where dni = $dni");
                if(count($resultado) == 0){
                    $consulta = "INSERT INTO usuarios_ficher_0001_z (`nombre_user`,`dni`,`contrasenia`) VALUES ('$dato','$dni','$contra');";
                    $id_user = $conexion->insertando_usuario($consulta);
                    session_start();
                    $_SESSION['id_user'] = $id_user[0];
                    print_r($id_user);
                }else{
                    print(-3);
                }
            }else{
                print(-5);
            }
        }else{
            print(-2);
        }
    }else{
        print(-1);
    }
?>