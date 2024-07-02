<?php include("./vista/components/vistaTabla.php"); ?>

  <?php include_once("./vista/layout/head.php");?>
  <title>CDVO - Saturno</title>
  <script src="https://unpkg.com/read-excel-file@5.x/bundle/read-excel-file.min.js"></script>
  <script src="https://unpkg.com/tableexport@latest/dist/js/tableexport.min.js"></script>
  <script src="https://unpkg.com/file-saverjs@latest/FileSaver.min.js"></script>

  <!-- manejo de los excel -->
  <script defer src="./vista/js/puppet-principal.js"></script>
  <script defer src="./vista/js/principal._date.js"></script>

  <link rel="stylesheet" href="./vista/css/principal.css">
  <link rel="stylesheet" href="./vista/css/components/vistaTabla.css">
</head>
<body>
    <?php include("./vista/layout/nav.php"); ?>

    <div class="tablas_opciones p-3">
      <label for="archivo_xlsx">
        <p class="btn btn-success">
          Agregar excel .xlsx
        </p>
        <!-- <button type="button" class="btn btn-success">Agregar excel .xlsx</button> -->
        <input type="file" id="archivo_xlsx" name="archivo_excel_xlsx" accept=".xlsx" hidden >
      </label>

      <label for="archivo_csv">
        <p class="btn btn-primary">
          Agregar excel .csv
        </p>
        <!-- <button type="button" class="btn btn-primary">Agregar excel .csv</button> -->
        <input type="file" id="archivo_csv" name="archivo_excel_csv" accept=".csv" hidden >
      </label>
    </div>

    <section class="tablas_disponibles">
      <?php
        vistaTabla("Ejemplo De tabla 1",1);
        vistaTabla("Ejemplo De tabla 1",2);
        vistaTabla("Ejemplo De tabla 1",3);
        vistaTabla("Ejemplo De tabla 1",4);
        vistaTabla("Ejemplo De tabla 1",5);
        vistaTabla("Ejemplo De tabla 1",6);
      ?>
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
    
    <?php include("./vista/layout/footer.php");?>
