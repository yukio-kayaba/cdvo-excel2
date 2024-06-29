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
        $titulo_t = $titulo.$id_user."z";
        if($opcion == 1){
            $validador = $conexion->get_tabla_colum("SELECT id FROM $titulo_t WHERE id = 1;");
            if($validador == -1){
                // print("acceso");
                $acceso = true;
                $datos_titulo = $datos[0];
                $cantidad_max_date = 0;
                $conexion->crear_tabla($titulo_t,$datos[0],$id_user);
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
            // print("editable");
            // $archivo = $_POST['id_archivo'];
            $datos_titulo1 = $conexion->get_tabla_colum("SELECT nombre_archivo FROM archivos_ficher_0001_z where id_user = $id_user and id = $titulo")[0];
            $titulo_t = $datos_titulo1;
            $datos_titulo = $conexion->get_datos($datos_titulo1,"WHERE id=1;")[0];
            // print_r($datos_titulo);
            foreach ($datos_titulo as $key => $value){
                if($key != 0){
                    if(is_numeric($key)){
                        // print($key " - ".$value."<br/>");
                        $codigo_parametro .= "`".$value."`,";
                        $cantidad_max_date += 1;
                    }
                }
            }
            $acceso = true;
        }

        if($acceso){



            $codigo_parametro = substr($codigo_parametro,0,-1);
            // echo $codigo_parametro;
            // print_r($titulo_t);

            foreach ($datos as $key => $value){
                // print_r(count($value)." - ".$cantidad_max_date."<br/>");
                if(count($value) == $cantidad_max_date){
                    if($opcion == 1){
                        if($key != 0){
                            // print_r($value);
                            $conexion->agregar_valores($titulo_t,$value,$codigo_parametro);
                        }
                    }else{
                        // print_r($value);
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
                    // print_r($nuevo_dato);
                    // print("<br/>");
                    $consulta = "INSERT INTO $titulo_t ($codigo_parametro) VALUES ($parametro_rasta)";
                    // print_r($consulta);
                    // $conexion->agregar_valores($titulo_t,$nuevo_dato,$codigo_parametro);
                    $conexion->insert_valores($consulta);

                }
            }
            print("exito");
        }
    }
?>