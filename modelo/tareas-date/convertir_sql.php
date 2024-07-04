<?php
    require_once("../modelo_sql.php");
    require_once("../configuracion.php");
    if(isset($_POST['datos'])){
        $conexion = new Modelo(user,bd_date,password);
        $datos = json_decode($_POST['datos']);
        $titulo = $_POST['titulo'];
        $opcion = $_POST['opcion'];
        $id_user = $_POST['user_date'];
        
        $datos_titulo;
        

        // verificando si la tabla existe;
        $cantidad_max_date = 0;
        $codigo_parametro = "";
        $acceso = true;
        $titulo = str_replace(" ","_",$titulo);
        $titulo_t = $titulo.$id_user."z";
        // print("el titulo nuevo es ::  ".$titulo_t);
        if($opcion == 1){
            $validador = $conexion->get_tabla_colum("SELECT id FROM $titulo_t WHERE id = 1;");
            if($validador == -1){
                // print("acceso");
                $acceso = true;
                $datos_titulo = [];
                $cantidad_max_date = 0;
                foreach($datos[0] as $key => $valor){
                    $datos_titulo[] = str_replace(" ","_",$valor);
                }
                
                $conexion->crear_tabla($titulo_t,$datos_titulo,$id_user);
                foreach ($datos_titulo as $key => $value){
                    if(is_numeric($key)){
                        $codigo_parametro .= "`".$value."`,";
                        $cantidad_max_date += 1;
                    }
                }
            }else{
                print("negado"); 
                $acceso = false;
            }
        }else if($opcion == 2){
            $cantidad_max_date = 0;
            $datos_titulo1 = $conexion->get_tabla_colum("SELECT nombre_archivo FROM archivos_ficher_0001_z where id_user = $id_user and id = $titulo")[0];
            $titulo_t = $datos_titulo1;
            $datos_titulo = $conexion->get_datos($datos_titulo1,"WHERE id=1;")[0];
            foreach ($datos_titulo as $key => $value){
                if($key != 0){
                    if(is_numeric($key)){
                        $codigo_parametro .= "`".$value."`,";
                        $cantidad_max_date += 1;
                    }
                }
            }
            $acceso = true;
        }

        if($acceso){



            $codigo_parametro = substr($codigo_parametro,0,-1);
            foreach ($datos as $key => $value){
                if(count($value) == $cantidad_max_date){
                    if($opcion == 1){
                        if($key != 0){
                            $conexion->agregar_valores($titulo_t,$value,$codigo_parametro);
                        }
                    }else{
                        $conexion->agregar_valores($titulo_t,$value,$codigo_parametro);
                        
                    }
                }else{
                    $nuevo_dato = [];
                    $parametro_rasta = "";
                    for ($i=0; $i < $cantidad_max_date; $i++) { 
                        $nuevo_dato[] = $value[$i + 1];
                        $parametro_rasta .= "`".$value[$i + 1]."`,";
                    }
                    $parametro_rasta= substr($parametro_rasta,0,-1);
                    $consulta = "INSERT INTO $titulo_t ($codigo_parametro) VALUES ($parametro_rasta)";
                    $conexion->insert_valores($consulta);
                }
            }
            print("exito");
        }
    }
?>