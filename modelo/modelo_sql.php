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
            $this->sql = $consulta;
            $resultado = $this->dbdatos->prepare($this->sql);
            $resultado->execute();
            return $resultado->fetchAll(PDO::FETCH_COLUMN);
        }
        public function validador_cuenta($dni,$contra){
            $this->sql = "select validador_cuenta('$dni', '$contra');";
            $resultado = $this->dbdatos->prepare($this->sql);
            $resultado->execute();
            return $resultado->fetchAll(PDO::FETCH_COLUMN);
        }
    };
?>