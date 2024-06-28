<?php include("./vista/components/vistaTabla.php"); ?>

  <?php include_once("./vista/layout/head.php");?>
  <title>GDVO - EXCEL</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="stylesheet" href="./vista/css/layout-nav.css">
  <link rel="stylesheet" href="./vista/css/principal.css">
  <link rel="stylesheet" href="./vista/css/components/vistaTabla.css">
  <link rel="stylesheet" href="./vista/css/editor.css">
  <script defer src="./vista/js/puppet-principal.js"></script>
  <script defer src="./vista/js/principal._date.js"></script>
</head>
<body>
    <?php include("./vista/layout/nav.php"); ?>
    
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
  <a id="agregar_archivo1" href="#">agregar excel .xlsx</a>
  <a id="agregar_archivo2" href="#">agregar excel .sslx</a>
</div>

  <!-- todo sobre el puppet -->
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
  <!-- fin de todo sobre el puppet -->
</body>
</html>