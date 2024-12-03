<?php
    class Modelo{
        private $sql;
        private $dbdatos;
        private $condicion;

        public function __construct($usuario,$base_datos,$password)
        {
            $this->dbdatos = new PDO("mysql:host=localhost;dbname=$base_datos",$usuario,$password);
        }
        public function get_tabla_colum($consulta){
            try {
                $this->sql = $consulta;
                $resultado = $this->dbdatos->prepare($this->sql);
                $resultado->execute();
                return $resultado->fetchAll(PDO::FETCH_COLUMN);
            } catch (PDOException $e) {
                return -1;
            }
        }
        public function validador_cuenta($dni,$contra){
            $this->sql = "select validador_cuenta('$dni','$contra');";
            $resultado = $this->dbdatos->prepare($this->sql);
            $resultado->execute();
            return $resultado->fetchAll(PDO::FETCH_COLUMN);
        }
        public function crear_tabla($titulo,$datos,$id,$tipo_variable = null){
            try {
                $tipos = ["VARCHAR(345)","INT(11)","DECIMAL","DATE","TINYINT"];
                $activo = true;
                if(count($tipo_variable) > 1){
                    $activo = false;
                    $tipo_variable = [0];
                } 
                $datos_1 = "CREATE TABLE $titulo(`id` INT NOT NULL AUTO_INCREMENT,";
                $codigo_valores = "";
                $codigo_parametros = "";
                $posicion = 0;
                foreach ($datos as $key => $value){
                    if(isset($tipo_variable[$posicion])){
                        $opcion_select = $tipos[$tipo_variable[$posicion]];
                    }else{
                        $opcion_select = "VARCHAR(345)";
                    }
                    // $opcion_select = ($activo)? $tipos[$tipo_variable[$posicion]] : "VARCHAR(345)";
                    $datos_1 .= "`$value` ".$opcion_select." NULL,";
                }
                $datos_1 .= "PRIMARY KEY (`id`));";
                // print($datos_1);
    // $this->sql = "CREATE TABLE $titulo(`id` INT NOT NULL AUTO_INCREMENT,PRIMARY KEY (`id`));";
                $this->sql = $datos_1;
                $this->ejecutar();
// INSERT INTO `ficheros`.`archivo_excel` (`time`, `carrera`, `acepta`, `positivo`, `negativo`, `edad`, `sexo`, `trabajo`) VALUES ('time', 'carrera', 'acepta', 'positivo', 'negativo', 'edad', 'sexo', 'trabajo');
                $codigo_valores = substr($codigo_valores,0,-1);
                $codigo_parametros = substr($codigo_parametros,0,-1);

                // $this->sql = "INSERT INTO $titulo ($codigo_valores) VALUES ($codigo_parametros);";
                // $this->ejecutar();

                $this->sql = "INSERT INTO archivos_ficher_0001_z (`id_user`,`nombre_archivo`) VALUES ('$id','$titulo')";
                $this->ejecutar();

                return 1;
            } catch (PDOException $e) {
                return $e;
            }
        }
        public function ejecutar(){
            $resultado = $this->dbdatos->prepare($this->sql);
            $resultado->execute();
            $resultado->closeCursor();
            // return $datos;
        }
        public function ejecutar1(){
            $datos = [];
            $resultado = $this->dbdatos->prepare($this->sql);
            $resultado->execute();
            foreach ($resultado as $key => $value) {
                $datos[] = $value;
            }
            $resultado->closeCursor();
            return $datos;
        }
        public function get_datos($tabla,$condicion){
            $this->sql = "SELECT * FROM $tabla $condicion;";
            return $this->ejecutar1();
        }
        public function get_describe_table($tabla){
            $this->sql = "DESCRIBE $tabla";
            return $this->ejecutar1();
        }
        public function agregar_valores($tabla,$datos,$parametros){
            $codigo_parametros = "";
            foreach ($datos as $key => $value) {
                $codigo_parametros .= "'".$value."',";
            }
            $codigo_parametros = substr($codigo_parametros,0,-1);
            // $codigo_valores = substr($parametros,0,-1);
            $this->sql = "INSERT INTO $tabla($parametros) VALUES ($codigo_parametros)";
            // print_r($this->sql);
            $this->ejecutar();
        }
        public function insertar_datos($tabla,$parametros,$valores){
            $this->sql = "INSERT INTO $tabla ($parametros) VALUES ($valores);";
            $this->ejecutar();
        }
        public function insert_valores($codigo){
            $this->sql = $codigo;
            $this->ejecutar();
        }
        public function insertando_usuario($codigo){
            $this->sql = $codigo;
            $resultado = $this->dbdatos->prepare($this->sql);
            $resultado->execute();
            $resultado->closeCursor();
            return $this->dbdatos->lastInsertId();
        }
        public function Actualizar_datos($codigo){
            $this->sql = $codigo;
            $resultado = $this->dbdatos->prepare($this->sql);
            $resultado->execute();
            $resultado->closeCursor();
        }
    };
?>