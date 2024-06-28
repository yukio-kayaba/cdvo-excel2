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
        

        $titulo_t = $titulo.$id_user."z";
        // verificando si la tabla existe;

        $acceso = true;
        if($opcion == 1){
            $validador = $conexion->get_tabla_colum("SELECT id FROM $titulo_t WHERE id = 1;");
            if($validador == -1){
                print("acceso");
                $acceso = true;
                $datos_titulo = $datos[0];
                $conexion->crear_tabla($titulo_t,$datos[0],$id_user);
            }else{
                print("negado"); 
                $acceso = false;
            }
        }else if($opcion == 2){
            // print("editable");
            $datos_titulo = $conexion->get_datos($titulo_t,"WHERE id=1;")[0];
            // print_r($datos_titulo);
            $acceso = true;
        }

        $codigo_parametro = "";

        if($acceso){

            $cantidad_max_date = 0;
            foreach ($datos_titulo as $key => $value){
                if($key != 0){
                    if(is_numeric($key)){
                        // print($key " - ".$value."<br/>");
                        $codigo_parametro .= "`".$value."`,";
                        $cantidad_max_date += 1;
                    }
                }
            }



            $codigo_parametro = substr($codigo_parametro,0,-1);
            // echo $codigo_parametro;
            // print($cantidad_max_date);

            foreach ($datos as $key => $value){
                if(count($value)  == $cantidad_max_date){
                    if($opcion == 1){
                        if($key != 0){
                            // print_r($value);
                            $conexion->agregar_valores($titulo_t,$value,$codigo_parametro);
                        }
                    }else{
                        // print_r($value);
                        $conexion->agregar_valores($titulo_t,$value,$codigo_parametro);
                    }
                }
            }
            print("exito");
        }



    }
?>