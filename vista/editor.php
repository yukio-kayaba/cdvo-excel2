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

  <!-- <script src="./vista/js/fileSaver.js"></script> -->
  <!-- <script defer src="./vista/js/puppet-editor.js"></script> -->
  <script defer src="./vista/js/editor_date.js"></script>
  <script defer src="./vista/js/notificaciones.js"></script>
  <!-- <script defer src="./vista/js/editor-ExportarExcel.js"></script> -->
</head>
<body>
  <?php include_once("./vista/layout/nav.php") ?>
  <div id="contenido">

    <p id="dato_id_archivo" hidden><?php echo $dato; ?></p>
    <section class="conteiner_btnCambio">
  
      <div>
        <label class="boton_editar_efecto" for="btn-subirArchivo">Subir archivo</label>
        <input type="file" name="" id="btn-subirArchivo" hidden>
        <!-- <a id="btn-subirArchivo" class="boton_editar_efecto" href="#">subir archivo</a> -->
      </div>
  
      <div>
        <a id="btn_guardar" class="boton_editar_efecto" href="#">guardar</a>
        <a id="btn_agregar" class="boton_editar_efecto" href="#">Agregar</a>
        <a id="btnExportar" class="boton_editar_efecto" href="#">exportar</a>
      </div>
    </section>
    <div class="container px-4 text-center">
      <div class="row gx-5">
        <div class="col">
          <div class="p-3" id="titulo_archivo_date">Titulo del archivo</div>
        </div>
      </div>
    </div>
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
    <section class="sombra_puppet" id="sombra_puppet"></section>
    <section class="tabla_puppet" id="puppet-tabla">
      <section class="conteiner_auxiliar" id="tabla_contenido">
        <table class="table tabla_dato">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>Larry</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>Larry</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
    
          </tbody>
        </table>
      </section>
      <section class="botones_tabla" id="botones_tabla">
        <a href="#">subir a la nube</a>
      </section>
    </section>
    <div class="boton_redondo_datos">
        +
    </div>
  </div>
</body>
</html>
