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
    get_dato(pos_x = 2,pos_y = 1){
        return this.datos[pos_x][pos_y];
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
    };
    conversion_datos(posicion,tipo = 1){
        let valor_retorno = 1;
        if(typeof(posicion) != "number"){
            if(!Number(posicion)){
                console.error("Para realizar el cambio , la posicion debe ser un numero");
                return -1;
            }
        }

        if(posicion > this.datos[0].length && posicion < 0){
            console.warn("Posicion erronea");
            return -1;
        }
        if(tipo == 1){
            this.datos.forEach(elementos => {
                if(Number(elementos[posicion])){
                    elementos[posicion] = Number(elementos[posicion]);
                }else{
                    console.warn("error de conversion");
                    valor_retorno = -2;
                }
            });
            this.datos[1][posicion] = "numeric";
        }else if(tipo == 2){
            this.datos.forEach(elementos => {
                if(Number(elementos[posicion])){
                    elementos[posicion] = String(elementos[posicion]);
                }else{
                    console.warn("error de conversion");
                    valor_retorno = -2;
                }
            });
            this.datos[1][posicion] = "string";

        }
        return valor_retorno;
    };
    reemplazar_valor(pos_x,pos_y,nuevo_valor){
        this.datos[pos_x][pos_y] = nuevo_valor;
    }

};