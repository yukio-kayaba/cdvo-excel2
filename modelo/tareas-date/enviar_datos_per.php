<?php
    require_once("../modelo_sql.php");
    require_once("../configuracion.php");
    session_start();
    if(isset($_POST['informacion'])){
        $conexion = new Modelo(user,bd_date,password);
        $datos = json_decode($_POST['informacion']);
        $titulo = $_POST['archivo'];
        $id_user = $_POST['date_user'];
        $id_valuable = $_SESSION['id_user'];
        $datos_titulo;
        
        $codigo_parametro = "";
        $cantidad_max_date = 0;
        $codigo_valores = "";
        $cant_cod_valores = 0;
        if($id_user == $id_valuable){
            $datos1 = $conexion->get_tabla_colum("SELECT nombre_archivo FROM archivos_ficher_0001_z where id_user = $id_valuable and id = $titulo");
            $datos_titulo = $conexion->get_describe_table($datos1[0]);
            foreach ($datos_titulo as $key => $value){
                if($value[0] == 'id') continue;
                if(is_numeric($key)){
                    $codigo_parametro .= "`".$value[0]."`,";
                    $cantidad_max_date += 1;
                }
            }
            $codigo_parametro = substr($codigo_parametro,0,-1);
            // print_r($codigo_parametro);
            foreach ($datos as $key => $value) {
                $codigo_valores .= "'".$value."',";
                $cant_cod_valores += 1;
            }
            $codigo_valores = substr($codigo_valores,0,-1);
            if($cant_cod_valores == $cantidad_max_date){
                $codigo = "INSERT INTO $datos1[0] ($codigo_parametro) VALUES ($codigo_valores);";
                $conexion->insert_valores($codigo);
                print("enviado");
            }else{
                print_r("no-date");
            }

        }else{ 
            header("location:http://localhost/github_date/cdvo-excel2/cerrar");
        }
    }
?>