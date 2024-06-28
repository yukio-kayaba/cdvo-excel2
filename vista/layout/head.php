<?php
    //impedir el guardado del caché del navegador
    header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
    header("Expires: Sat, 1 Jul 2000 05:00:00 GMT"); // Fecha en el pasado
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">

    <!-- metas para impedir el guardado del caché del navegador -->
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Last-Modified" content="0">
    <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" defer></script>
    <link rel="stylesheet" href="./vista/css/main.css">