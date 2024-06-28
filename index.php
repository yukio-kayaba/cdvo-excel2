<?php
    require_once("./controlador/controlador.php");
    session_start();
    if(isset($_SESSION['id_user'])){
        if(isset($_GET['vista'])){
            // print_r($_GET['vista']);
            $url = explode("/",$_GET['vista']);
        
            if(method_exists("ModeloControlador",$url[0])){
                ModeloControlador::{$url[0]}();
            }else{
                ModeloControlador::error_pagina();
            }
        }else{
            ModeloControlador::editor();
        }
    }else{
        // ModeloControlador::editor();
        ModeloControlador::login();
    }
?>