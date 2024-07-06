<?php
    require_once("../modelo_sql.php");
    require_once("../configuracion.php");

    $conexion = new Modelo(user,bd_date,password);
    $datos = $conexion->get_datos("mensajes_totales_publicos_001_z","limit 15");

    print_r(json_encode($datos));
?>