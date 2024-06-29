<?php include("./vista/components/vistaTabla.php"); ?>

  <?php include_once("./vista/layout/head.php");?>
  <title>GDVO - EXCEL</title>
  <script src="https://unpkg.com/xlsx@0.16.9/dist/xlsx.full.min.js"></script>
  <script src="https://unpkg.com/file-saverjs@latest/FileSaver.min.js"></script>
  <script src="https://unpkg.com/tableexport@latest/dist/js/tableexport.min.js"></script>

  <link rel="stylesheet" href="./vista/css/layout-nav.css">
  <link rel="stylesheet" href="./vista/css/principal.css">
  <link rel="stylesheet" href="./vista/css/components/vistaTabla.css">
  <link rel="stylesheet" href="./vista/css/editor.css">
  <script defer src="./vista/js/principal._date.js"></script>
  <script defer src="./vista/js/puppet-principal.js"></script>
</head>
<body>
    <?php include("./vista/layout/nav.php"); ?>
    <div id="contenido">
      <section class="info_usuario">
        <div class="conteiner-fotoUsuario">
          <img src="./vista/icon/usuario.png" alt="foto de perfil del usuario">
        </div>
        <p id="nombre_user">Nombre Del Usuario</p>
      </section>
  
      <section class="tablas_disponibles">
        <?php
          vistaTabla("comida del dia",1);
          vistaTabla("compras",2);
          vistaTabla("noticias",4);
        ?>
  
        </section>
        <div class="tablas_opciones">
          <label for="archivo_xlsx">
            <a id="agregar_archivo1">Agregar excel .xlsx</a>
            <input type="file" id="archivo_xlsx" name="archivo_excel_xlsx" accept=".xlsx" hidden >
          </label>

          <label for="archivo_csv">
            <a id="agregar_archivo2">Agregar excel .csv</a>
            <input type="file" id="archivo_csv" name="archivo_excel_csv" accept=".csv" hidden >
          </label>

          <label for="archivo_csv">
            <a id="agregar_archivo3">Crear hoja</a>
            <!-- <input type="file" id="archivo_csv" name="archivo_excel_csv" accept=".csv" hidden > -->
          </label>
        </div>
        <div class="boton_redondo_datos1">+</div>
    </div>
</body>
</html>