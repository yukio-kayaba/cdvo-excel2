<?php
    $dato = "";
    if(isset($_GET['archivo'])){
      // echo "si existe";
      $dato = $_GET['archivo'];
    }
?>
<?php include_once("./vista/layout/head.php") ?>
  <title>CDVO || EDITAR</title>
  <script src="https://unpkg.com/xlsx@0.16.9/dist/xlsx.full.min.js"></script>
  <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>

  <script src="https://unpkg.com/file-saverjs@latest/FileSaver.min.js"></script>
  <script src="https://unpkg.com/tableexport@latest/dist/js/tableexport.min.js"></script>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="stylesheet" href="./vista/css/layout-nav.css">
  <link rel="stylesheet" href="./vista/css/editor.css">
  <link rel="stylesheet" href="./vista/css/ESTYLOS_NOTIFICACIONES.css">

  <script defer src="./vista/js/editor_date.js"></script>
  <script defer src="./vista/js/notificaciones.js"></script>
</head>
<body>
  <?php include_once("./vista/layout/nav.php") ?>
  <div id="contenido">

    <p id="dato_id_archivo" style="display:none;"><?php echo $dato; ?></p>

    <section class="d-flex justify-content-between mx-4">
      <div>
        <a id="btn_guardar" class="btn btn-success" href="inicios">Regresar</a>
        <label class="btn btn-primary" for="btn-subirArchivo">Subir archivo</label>
        <input type="file" name="" id="btn-subirArchivo" hidden accept=".xlsx">
      </div>
  
      <div>
        <a id="btn_guardar" class="btn btn-primary" href="#">guardar</a>
        <a id="btn_agregar" class="btn btn-primary" href="#">Agregar</a>
        <a id="btnExportar" class="btn btn-primary" href="#">exportar</a>
      </div>
    </section>

    <div class="w-100 text-center fw-bold fs-2 mt-2 text-wrap">
      <div id="titulo_archivo_date">Titulo del archivo</div>
    </div>

    <!-- TABLA DE DATOS -->
    <section id="tabla_datos_principal">
      <table id="tabla" class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>First</th>
            <th>Last</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>Larry the Bird</td>
            <td>Larry</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </section>
    <!-- FIN TABLA DE DATOS -->

    <section class="sombra_puppet" id="sombra_puppet"></section>

    <section class="tabla_puppet" id="puppet-tabla">
      <section id="campos_tabla">

      </section>
      <section class="botones_tabla" id="botones_tabla">
        <a href="#">subir a la nube</a>
      </section>
    </section>

    <div class="boton_redondo_datos">
        +
    </div>
  </div>
  <div class="contenedor-toast_date" id="contenedor-toast_date"></div>
<?php
  require_once("./vista/layout/footer.php");
?>
