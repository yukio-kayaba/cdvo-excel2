<?php function vistaTabla($nombre,$id){ ?>

  <article class="vistaTabla" >
    <p name="<?php echo $id;?>">
      <?php echo($nombre); ?>
    </p>
    <div>
      <!-- esto siempre está vacio -->
    </div>
  </article>

<?php } ?>