<?php
    class ModeloControlador{
        public function __construct(){}
        
        static function inicio(){
            require_once("./vista/principal.php");
        }
        static function inicios(){
            require_once("./vista/inicio_date_reload.php");
        }
        static function login(){
            require_once("./vista/login.php");
        }
        static function error_pagina(){}
        
        static function editor(){
            require_once("./vista/editor.php");
        }
        static function cerrar(){
            require_once("./vista/cerrar_secion.php");
        }
        static function mensajes(){
            require_once("./vista/mensajes.php");
        }
    }
?>