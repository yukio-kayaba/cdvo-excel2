<?php
    require_once("../configuracion.php");
    require_once("../modelo_sql.php");
    session_start();
    if(isset($_POST['valores'])){
        $conexion = new Modelo(user,bd_date,password);
        $id_user = $_POST['valores'];
        $id_valuable = $_SESSION['id_user'];

        if($id_user == $id_valuable){
            $nombre_user = $conexion->get_tabla_colum("SELECT nombre_user FROM usuarios_ficher_0001_z WHERE id = $id_valuable;")[0];
            print_r($nombre_user);
        }
    }
?>