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
    <title>CDVO</title>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" defer></script>
    <link rel="stylesheet" href="./vista/css/stylos.css">
    <link rel="stylesheet" href="./vista/css/main.css">
    <script  src="./vista/js/APP.js" defer></script>
    <script src="./vista/js/login_date.js" defer></script>
</head>
<body>
    <div class="container">
        <section class="conteiner-img">
            <img src="./vista/img/CDVO.jpg" alt="">
        </section>

        <div class="cuadro_texto">
            <form id="login-form" class="form">
                <input type="text" id="dni" placeholder="dni">
                <input type="password" id="contra" placeholder="contraseña">

                <input type="submit" value="Iniciar Secion">
                <div class="border"></div>
                <p class="create-pages" id="create_count"><i>Crear cuenta</i></p>
            </form>
            <p class="create-page">
                <a href="#"> GDVO </a> te conecta con el software que necesitas
            </p>
        </div>
    </div>
<?php
    require_once("./vista/layout/footer.php");
?>

