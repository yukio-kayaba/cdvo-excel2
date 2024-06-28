<?php
    class ModeloControlador{
        public function __construct(){}
        
        static function inicio(){
            require_once("./vista/principal.php");
        }
        static function login(){
            require_once("./vista/login.php");
        }
        static function error_pagina(){}
        
        static function editor(){
            require_once("./vista/editor.php");
        }
    }
?>