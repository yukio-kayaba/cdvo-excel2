<?php

  require_once("./vista/layout/header.php");  
?>
    <script src="./vista/js/editor.js" defer></script>
</head>
<body>

    <div class="row">
        <div class="archivo">
            <label for="archivo">Subir archivo</label>
            <input type="file" name="" id="archivo" accept=".xlsx,.csv" hidden>
        </div>
    </div>
    <button id="servidor" >Subir al servidor</button>
    <div id="tabla">

    </div>

<?php
    require_once("./vista/layout/footer.php");
?>