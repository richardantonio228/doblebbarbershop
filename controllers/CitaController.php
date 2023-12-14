<?php

namespace Controllers;

use MVC\Router;

class CitaController{
  
    public static function index(Router $router) {
        session_start(); //Iniciar session

        isAuth();// EJecutando la validacion de usuario

        $router->render('cita/index',[
            'nombre' => $_SESSION['nombre'], //Para que el nombre salga en el label
            'id' => $_SESSION['id']
        ]);
    }
}