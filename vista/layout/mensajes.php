<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog bg-dark">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Mensaje</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mensaje_radio_display">
                <div class="form-check">
                  <input class="form-check-input valor_radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1" hidden checked>
                  <label class="form-check-label " for="flexRadioDefault1">
                    <img id="imagen1" class="check_fondo_activado" src="./vista/img/graficos/dato_publico.png" alt="publico">
                    <p>publico</p>
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input valor_radio" type="radio" name="flexRadioDefault" id="flexRadioDefault2" hidden>
                  <label class="form-check-label " for="flexRadioDefault2">
                    <img  id="imagen2" class="check_fondo_desactivado" src="./vista/img/graficos/candado.png" alt="privado">
                    <p>privado</p>
                  </label>
                </div>

              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label">Message:</label>
                <textarea class="form-control" id="message-text"></textarea>
              </div>
              <p id="comprobador_mensaje"></p>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              <img src="./vista/img/graficos/delete.png" alt="" width="30px">
            </button>
            <button type="button" class="btn btn-primary" id="btn_load_mensaje">
              <img src="./vista/img/graficos/enviar.png" alt="" width="30px">
            </button>
          </div>
        </div>
      </div>
    </div>