class datos_control{
    constructor(){
        this.datos = [];
        this.control_ubdate = 0;
    }
    agregar_valores_nuevos(nuevo_datos){
        if(!Array.isArray(nuevo_datos) || nuevo_datos < 1){
            return console.warn("datos no permitidos");
        }
        this.datos = nuevo_datos;
        this.control_ubdate = 0;
    }
    get_datos(){
        this.control_ubdate += 1;
        return this.datos;
    }
    set_datos(valores_nuevos = []){
        if(!Array.isArray(valores_nuevos) || valores_nuevos.length < 1){
            return "error solo arrays";
        }
        this.datos.push(valores_nuevos);
        this.control_ubdate += 1;
    }

    cambiar_hubicacion(pos_anterior,pos_nueva){
        for (let i = Number(pos_anterior); i < Number(pos_nueva); i++) {
            let aux_datos = this.datos[i];
            this.datos[i] = this.datos[i + 1];
            this.datos[i + 1] = aux_datos;
        }
        this.control_ubdate += 1;
    }
    eliminar_valor(posicion){
        this.datos.splice(1,posicion);
        this.control_ubdate += 1;

    }
    modificar_datos(posicion,valores){
        this.datos[posicion] = valores;
        this.control_ubdate += 1;
    }
    get_control_ubdate(){
        return this.control_ubdate;
    }
    conversion_datos(posicion,tipo = 1){
        if(typeof(posicion) != "number"){
            console.error("Para realizar el cambio , la posicion es un numero");
            return;
        }

        if(posicion > this.datos[0].length && posicion < 0){
            console.warn("Posicion erronea");
            return;
        }
        if(tipo == 1){
            this.datos.forEach(elementos => {
                elementos[posicion] = Number(elementos[posicion]);
            });
        }else if(tipo == 2){
            this.datos.forEach(elementos => {
                elementos[posicion] = Number(elementos[posicion]);
            });
        }

    }
};