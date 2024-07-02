
class notficacion{

    constructor(id_objeto,clase_notificicacion = null){
        this.elemento = document.getElementById(id_objeto);
        if(this.elemento==null) return console.warn("agregue un id correcto");
        this.id_objetc = 0;
        this.tiempo = 0;
        this.class_div = (clase_notificicacion != null)? clase_notificicacion : "notificacion";
        this.iconos = {
            error:`😵`,
            exito:`😉`,
            informacion:`🤔`,
            peligro:`🤐`
        };
    }
    get_cerrar_notificacion(id){
        document.getElementById(id)?.classList.add('cerrando');
        // this.elemento?.classList.add('cerrando');
    }
    get_object_connect(){
        return this.elemento;
    }
    get_iconos_date(tip = null){
        if(tip === null )return this.iconos;
        let valor_result;
        if(tip == 'error'){
            valor_result = this.iconos.error;
        }else if(tip == 'exito'){
            valor_result = this.iconos.exito;
        }else if(tip == 'informacion'){
            valor_result = this.iconos.informacion;
        }else if(tip == 'peligro'){
            valor_result = this.iconos.peligro;
        }else{
            valor_result = "Dato no encontrado";
        }
        return valor_result;
    }
    set_id_objetc(){
        return this.id_objetc;
    }
    generador_text_valor({tipo,titulo,descripcion,autocierre,tiempo}){

        const div_new = document.createElement('div');
        div_new.classList.add(this.class_div);
        div_new.classList.add(tipo);
        this.tiempo = tiempo;
        if(autocierre) {
            div_new.classList.add('auto-cierre');
        }
        const numero_azar = Math.floor(Math.random()*100);
        const fecha = Date.now();
        const div_id = fecha + numero_azar;
        div_new.id = div_id;
        this.id_objetc = div_id;
        const texto = `
        <div class="contenido">
            <div class="icono">
                ${this.get_iconos_date(tipo)}
            </div>
            <div class="texto">
                <p class="titulo">${titulo}</p>
                <p class="descripcion">${descripcion}</p>
            </div>
        </div>
            <button class="btn-cerrar">
                <div class="icono">
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"  viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </div>
            </button>
        `;
        div_new.innerHTML = texto;
        this.elemento.appendChild(div_new);
        // objeto.appendChild(div_new);
        const animacion_cierre = (e)=>{
            // console.log(e.animationName);
            if(e.animationName == 'cierre'){
                div_new.removeEventListener('animationend',animacion_cierre);
                div_new.remove();
            }
        }
        if(autocierre){
            setTimeout(()=>this.get_cerrar_notificacion(div_id),((tiempo)? tiempo:7000));
        }

        div_new.addEventListener("animationend",animacion_cierre);
    }
    eliminar_objeto_cierre(e = null){
        if(e != null){
            console.log(e);
            // document.getElementById(this.id_objetc).removeEventListener('animationend',this.eliminar_objeto_cierre);
        }
        document.getElementById(this.id_objetc).remove();
    }
    event_close_object(){
        const objeto = document.getElementsByClassName(this.class_div);
        const cantidad_objetos = objeto.length;
        for (let i = 0; i < cantidad_objetos; i++) {
            document.getElementsByClassName(this.class_div)[i].addEventListener('click',(e)=>{
                let id_date = (e.target.parentElement.id);

                if(id_date != "" ){
                    let dato = document.getElementById(id_date);
                    dato.classList.remove('auto-cierre');
                    dato.classList.add('cerrando');
                    setTimeout(() => {
                        dato.remove();
                    }, this.tiempo - 300);

                }

            });
        }
    }
}