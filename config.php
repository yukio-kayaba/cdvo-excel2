<?php
    // define("url","http://localhost/CDVO-EXCEL2/");
    $baseUrl = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']);
    $rutaCompleta = $baseUrl;
    define("url",$rutaCompleta);
?>