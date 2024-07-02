<?php function vistaTabla($nombre,$id){ ?>

  <article class="vistaTabla" >
    <p name="<?php echo $id;?>">
      <?php echo($nombre); ?>
    </p>
    <div>
      <!-- esto siempre está vacio -->
      <img src="./vista/img/ver_hoha.png" alt="">
    </div>
  </article>

<?php } ?>