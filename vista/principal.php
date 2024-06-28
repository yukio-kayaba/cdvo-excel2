<?php include("./vista/components/vistaTabla.php"); ?>

  <?php include_once("./vista/layout/head.php");?>
  <title>GDVO - EXCEL</title>
  <link rel="stylesheet" href="./vista/css/layout-nav.css">
  <link rel="stylesheet" href="./vista/css/principal.css">
  <link rel="stylesheet" href="./vista/css/components/vistaTabla.css">
</head>
<body>
    <?php include("./vista/layout/nav.php"); ?>
    
    <section class="info_usuario">
      <div class="conteiner-fotoUsuario">
        <img src="./vista/icon/usuario.png" alt="foto de perfil del usuario">
      </div>
      <p>Nombre Del Usuario</p>
    </section>

    <section class="tablas_disponibles">
      <?php
      vistaTabla("comida del dia");
      vistaTabla("compras");
      vistaTabla("noticias");
      ?>

      <div class="tablas_opciones">
        <a href="#">agregar excel .xlsx</a>
        <a href="#">agregar excel .sslx</a>
      </div>
    </section>

    <div id="tabla">
    </div>
</body>
</html>