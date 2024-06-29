<?php
    require_once("../modelo_sql.php");
    require_once("../configuracion.php");

    if(isset($_POST['dni'])){


        $conexion = new Modelo(user,bd_date,password);
        $dni = $_POST['dni'];
        $dni = trim($dni);
        if(strlen($dni) == 8 ){
            $contra = $_POST['contrasenia'];
            $dato = $_POST['nombre'];
            $resultado = $conexion->get_tabla_colum("SELECT dni FROM usuarios_ficher_0001_z where dni = $dni");
            // print_r(count($resultado));
            if(count($resultado) == 0){
                $consulta = "INSERT INTO usuarios_ficher_0001_z(`dni`,`contrasenia`,`nombre_user`) VALUES ('$dni','$contra','$dato');";
                $id_user = $conexion->insertando_usuario($consulta);
                session_start();
                $_SESSION['id_user'] = $id_user[0];
                print_r($id_user);
                // print_r($id);
            }else{
                print(-3);
            }
        }else{
            print(-2);
        }

    }else{
        print(-1);
    }
?>