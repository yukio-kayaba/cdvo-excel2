<?php
    require_once("../configuracion.php");
    require_once("../modelo_sql.php");
    session_start();
    if(isset($_POST['valores'])){
        $conexion = new Modelo(user,bd_date,password);
        $id_user = $_POST['valores'];
        $archivo = $_POST['archivo'];
        $id_valuable = $_SESSION['id_user'];

        if($id_user == $id_valuable){
            $datos1 = $conexion->get_tabla_colum("SELECT nombre_archivo FROM archivos_ficher_0001_z where id_user = $id_valuable and id = $archivo");
            
            $datos = $conexion->get_datos("$datos1[0]","");
            
            // $nombre_user = $conexion->get_tabla_colum("SELECT nombre_user FROM usuarios_ficher_0001_z WHERE id = $id_valuable;")[0];
            $new_datos = [];
            foreach ($datos as $key => $value) {
                $date_aux = array();
                foreach ($value as $key1 => $date_a) {
                    if(is_numeric($key1)){
                        $date_aux[] = $date_a;
                    }
                }
                $new_datos[] = $date_aux;
            }
            print_r(json_encode($new_datos));
        }
    }
?>