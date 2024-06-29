<?php
    $dato = "";
    if(isset($_GET['archivo'])){
      // echo "si existe";
      $dato = $_GET['archivo'];
    }
?>
<?php include_once("./vista/layout/head.php") ?>
  <title>Editor de Excel</title>
  <script src="https://unpkg.com/xlsx@0.16.9/dist/xlsx.full.min.js"></script>
  <script src="https://unpkg.com/file-saverjs@latest/FileSaver.min.js"></script>
  <script src="https://unpkg.com/tableexport@latest/dist/js/tableexport.min.js"></script>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="stylesheet" href="./vista/css/layout-nav.css">
  <link rel="stylesheet" href="./vista/css/editor.css">
  <script defer src="./vista/js/puppet-editor.js"></script>
<<<<<<< HEAD
  <script defer src="./vista/js/editor_date.js"></script>
=======
  <script defer src="./vista/js/editor-ExportarExcel.js"></script>
  
>>>>>>> c9c9d8b8295be031e5bb8f222fa881e47762dabb
</head>
<body>
  <?php include_once("./vista/layout/nav.php") ?>
  <p id="dato_id_archivo" hidden><?php echo $dato; ?></p>
  <section class="conteiner_btnCambio">

    <div>
      <a id="btn-subirArchivo" href="#">subir archivo</a>
    </div>

    <div>
      <a id="btn_guardar" href="#">guardar</a>
      <a id="btn_agregar" href="#">agregar</a>
      <a id="btnExportar" href="#">exportar</a>
    </div>
  </section>

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
  
        </tbody>
      </table>
    </section>
    <section class="botones_tabla" id="botones_tabla">
      <a href="#">subir a la nube</a>
    </section>
  </section>

</body>
</html>
