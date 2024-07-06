<?php
    require_once("../modelo_sql.php");
    require_once("../configuracion.php");
    session_start();
    if(isset($_POST['valor_data'])){
        try {
            $dato_user = $_POST['valor_data'];
            $mensaje = $_POST['mensaje'];
            $dato_radio = $_POST['dato_radio'];
            $id_valuable = $_SESSION['id_user'];
            // $acceso = true;
            for ($i=0; $i < strlen($mensaje); $i++) { 
                if($mensaje[$i] == "/" || $mensaje[$i] == "<" || $mensaje[$i] == ">" || $mensaje[$i]  == '"' ||$mensaje[$i] == "`" ){
                    $mensaje[$i] = "_";
                }
            }

            if($id_valuable == $dato_user){
                $tipo_mensaje = ($dato_radio == 1)?'publico':'privado';
                $conexion = new Modelo(user,bd_date,password);
                $consulta = "INSERT INTO mensajes_ficher_001_z(`id_usuario`, `comentario`, `tipo`) VALUES ('$id_valuable','$mensaje','$tipo_mensaje');";
                // print($consulta);
                $dato = $conexion->insert_valores($consulta);
                print(1);
            }else{
                print(-2);
            }

        } catch (PDOException $e) {
            print("-7 - ".$e);
        }
        
    }
?>