<?php include("./vista/components/vistaTabla.php"); ?>
  <?php include_once("./vista/layout/head.php");?>
  <title>CDVO - Saturno</title>
  <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>
  <script src="https://unpkg.com/tableexport@latest/dist/js/tableexport.min.js"></script>
  <script src="https://unpkg.com/file-saverjs@latest/FileSaver.min.js"></script>

  <!-- manejo de los excel -->
  <script defer src="./vista/js/puppet-principal.js"></script>
  <script defer src="./vista/js/principal._date.js"></script>
  <script defer src="./vista/js/notificaciones.js"></script>

  <link rel="stylesheet" href="./vista/css/principal.css">
  <link rel="stylesheet" href="./vista/css/components/vistaTabla.css">
  <link rel="stylesheet" href="<?php echo url;?>/vista/css/ESTYLOS_NOTIFICACIONES.css">
</head>
<body>
    <?php include("./vista/layout/nav.php"); ?>

    <div class="tablas_opciones px-2">
      <div class="buscador_datos">
        <div>
          <img src="<?php echo url;?>/vista/img/graficos/saturno_read.png" alt="">
          <p>Que realizaremos hoy ? </p>
        </div>
        <div class="input-group mb-3">
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping">
              <span id="basic-addon1"> 
                <img src="<?php echo url; ?>/vista/img/graficos/saturno_seeker.png" alt="Buscador" width="30px">
              </span>
            </span>
            <input type="text" class="form-control" placeholder="Buscar" aria-label="Username" aria-describedby="addon-wrapping">
          </div>
        </div>
      </div>
    </div>

    <div class="tablas_opciones p-1 botones_opciones">
      <div class="opciones_datos">
        <label for="archivo_xlsx" class="datos_input_date">
          <img src="<?php echo url;?>/vista/img/graficos/file_xlsx.png" alt="">
          <p class="btn btn-success m-0">
            Subir Excel
          </p>
          <input type="file" id="archivo_xlsx" name="archivo_excel_xlsx" accept=".xlsx" hidden >
        </label>
  
        <label for="archivo_csv" class="datos_input_date">
          <img src="<?php echo url;?>/vista/img/graficos/file_csv.png" alt=""> 
          <p class="btn btn-primary m-0">
            Subir CSV
          </p>
          <input type="file" id="archivo_csv" name="archivo_excel_csv" accept=".csv" hidden >
        </label>
        
        <label  id="archivo_nuevo" class="datos_input_date">
          <img src="<?php echo url;?>/vista/img/graficos/file_xlsx.png" alt="">
            <p class="btn btn-secondary m-0">
              Nueva Hoja
            </p>
        </label>
      </div>
    </div>


    <section class="tablas_disponibles">
        <div class="muestra_principal">
            <img src="<?php echo url; ?>/vista/img/graficos/saturno.png" alt="">
            <p>Tu escritorio Saturno aun esta vacio  </p>
        </div>
    </section>

    <!-- INICIO DEL PUPPET -->
    <div id="contenido" class="p-2 rounded" style="display:none">
      <section style="position: sticky; top: 0px; background: rgb(231, 231, 231); box-shadow: 3px 0px 7px black;" class="w-100 d-flex justify-content-between align-items-center rounded">
        <p style="overflow:auto;" class="fs-6 ps-3 fw-bolder text-nowrap">VISUALIZAR DATOS</p>
        <button id="btn_cerraPuppet" type="button" class="btn btn-danger">X</button>
      </section>

      <table id="tabla" class="table tabla_dato" style="flex-direction: column;">
        <thead class="table-dark">
          <tr style="position: sticky; top: 50px;">
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <?php for($i=0; $i < 200; $i++) { ?>
            <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            </tr>
          <?php }; ?>
        </tbody>
      </table>

      <section style="position: sticky; bottom: 10px;" class="botones_tabla d-flex justify-content-end me-2" id="botones_tabla">
        <button type="button" class="btn btn-success fs-5 f-">subir a la nube</button>
      </section>

    </div>
    <!-- FIN DEL PUPPET -->
     <!-- CUADRO PARA LAS NOTIFICACIONES -->
    <div class="contenedor-toast_date" id="contenedor-toast_date"></div>
    <!-- FIN DE CUADRO DE NOTIFICACIONES -->
    <?php include("./vista/layout/footer.php");?>
