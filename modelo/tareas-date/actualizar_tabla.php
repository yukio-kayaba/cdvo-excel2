<?php
    require_once("../modelo_sql.php");
    require_once("../configuracion.php");
    session_start();

    if(isset($_POST['archivo'])){
        try {
            $tabla = $_POST["archivo"];
            $fila = $_POST['fila'];
            $columna = $_POST['columna'];
            $contenido = $_POST['contenido'];
            $consulta = "UPDATE $tabla SET $columna = '$contenido' WHERE id = $fila";
            $conexion = new Modelo(user,bd_date,password);
            $conexion->Actualizar_datos($consulta);
            echo "listo";
        } catch (PDOException $e ) {
            print($e);
        }
    }

?>