<?php include_once("./vista/layout/head.php") ?>
  <title>CDVO || Mensajes</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="stylesheet" href="./vista/css/layout-nav.css">
  <link rel="stylesheet" href="<?php echo url;?>/vista/css/mensajes_e.css">
  <link rel="stylesheet" href="<?php echo url;?>/vista/css/components/mensajes_estylos.css">
  <script defer src="./vista/js/notificaciones.js"></script>
  <script defer src="./vista/js/mensajes_vista.js"></script>
</head>
<body>
<?php include("./vista/layout/nav.php"); ?>
<div id="contenedor_principal">
    <div class="cuadro_data_me">
        <div id="tabla_mensajes">

          <div class="mensajes_data" name="">
            <div class="card">
              <div class="card-header">
                Featured
              </div>
              <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>

          
        </div>
        <div id="envio_mensajes">
          <div class="input-group mb-3">
            <div class="input-group-text">
              <input class="form-check-input mt-0" id="date_pu_pri" type="checkbox" value="" aria-label="Checkbox for following text input">
            </div>
            <textarea name="" id="mensaje_texto" placeholder="Ingrese texto"></textarea>
            <button type="button" class="btn btn-success" id="load_message_date">
              <img src="./vista/img/graficos/enviar.png" alt="" width="30px">
            </button>
          </div>
        </div>
    </div>
</div>

<?php require_once("./vista/layout/mensajes.php"); ?>
<?php
  require_once("./vista/layout/footer.php");
?>