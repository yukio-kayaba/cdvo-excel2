<?php
    require_once("../configuracion.php");
    require_once("../modelo_sql.php");
    session_start();
    if(isset($_POST['valores'])){
        $conexion = new Modelo(user,bd_date,password);
        $id_user = $_POST['valores'];
        $archivo = $_POST['archivo'];
        $id_valuable = $_SESSION['id_user'];

        if($id_user == $id_valuable){
            $datos1 = $conexion->get_tabla_colum("SELECT nombre_archivo FROM archivos_ficher_0001_z where id_user = $id_valuable and id = $archivo");
            print_r($datos1[0]);
        }else{
            header("location:cerrar");
        }
    }
?>