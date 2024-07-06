<?php
    require_once("../modelo_sql.php");
    require_once("../configuracion.php");

    $conexion = new Modelo(user,bd_date,password);
    $datos = $conexion->get_datos("mensajes_totales_publicos_001_z","order by id desc limit 15");
    $datos = array_reverse($datos);
    print_r(json_encode($datos));
?>