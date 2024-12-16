<?php
    $dato = "";
    if(isset($_GET['archivo'])){
      // echo "si existe";
      $dato = $_GET['archivo'];
    }
?>
<?php 
  include_once("./vista/layout/head.php");
  include_once("./config.php");
 ?>
  <title>CDVO || EDITAR</title>
  <script src="https://unpkg.com/xlsx@0.16.9/dist/xlsx.full.min.js"></script>
  <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>

  <script src="https://unpkg.com/file-saverjs@latest/FileSaver.min.js"></script>
  <script src="https://unpkg.com/tableexport@latest/dist/js/tableexport.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dragula@3.7.3/dist/dragula.min.js"></script>


  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="stylesheet" href="./vista/css/layout-nav.css">
  <link rel="stylesheet" href="<?php echo url;?>/vista/css/editor.css">
  <link rel="stylesheet" href="./vista/css/components/mensajes_estylos.css">
  <!-- <link rel="stylesheet" href="style.css"> -->
  <link rel="stylesheet" href="<?php echo url;?>/vista/css/components/edit_table.css">

  <link rel="stylesheet" href="./vista/css/ESTYLOS_NOTIFICACIONES.css">

  <script defer src="./vista/js/editor_date.js"></script>
  <script defer src="./vista/js/notificaciones.js"></script>
  <script defer src="./vista/js/mensajes.js"></script>
  <script defer src="<?php echo url;?>/vista/js/tasks/manejo_datos.js"></script>
  <script defer src="<?php echo url;?>/vista/js/modal_edit.js"></script>


</head>
<body>
  <?php include_once("./vista/layout/nav.php"); ?>
  <div id="contenido">

    <p id="dato_id_archivo" style="display:none;"><?php echo $dato; ?></p>

    <section class="d-flex justify-content-between mx-4 botones_opciones">
      <div>
        <label class="btn btn-primary btn_opc_date" for="btn-subirArchivo">
          <img src="<?php echo url;?>/vista/img/graficos/file_xlsx.png" alt="" width="40px">
          <p>Subir</p>
        </label>
        <input type="file" name="" id="btn-subirArchivo" hidden accept=".xlsx">
        <button type="button" class="btn btn-primary boton_mensaje_date" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
          <img src="<?php echo url;?>/vista/img/graficos/mensaje.png" alt="" width="40px">
          <p>mensaje</p>
        </button>
      </div>
  
      <div>
        <a id="btn_guardar" class="btn btn-primary btn_opc_date" href="#">
          <img src="<?php echo url;?>/vista/img/graficos/file.png" alt="Guardar" width="40px">
          <p>Guardar</p>
        </a>
        <a id="btn_agregar" class="btn btn-primary btn_opc_date" href="#">
          <img src="<?php echo url;?>/vista/img/graficos/add_file_date.png" alt="Agregar" width="40px">
          <p>Agregar</p>
        </a>
        <a id="btnExportar" class="btn btn-primary btn_opc_date" href="#">
          <img src="<?php echo url;?>/vista/img/graficos/dowload_file.png" alt="Subir" width="40px">
          <p>Excel DOWL</p>
        </a>
        <a id="btnExportar_arff" class="btn btn-primary btn_opc_date" href="#">
          <img src="<?php echo url;?>/vista/img/graficos/logo_weka2.png" alt="Subir" width="40px">
          <p>ARFF DOWL</p>
        </a>
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
      <section 
        style="max-height: 90vh;border:3px solid #55cfce; padding:1px; border-radius:10px" 
        class="bg-light" id="campos_tabla">
        <!-- acá se genera una tabla -->
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
  <?php require_once("./vista/layout/mensajes.php"); ?>
  <?php require_once("./vista/layout/modal_edit.php"); ?>
<?php
  require_once("./vista/layout/footer.php");
?>
