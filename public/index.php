<?php

require_once __DIR__ . '/../includes/app.php';

use Controllers\AdminController;
use Controllers\ServicioController;
use MVC\Router;
use Controllers\ApiController;
use Controllers\CitaController;
use Controllers\LoginController;


$router = new Router();
//Iniciar sesión

$router->get('/', [LoginController::class, 'login']);
$router->post('/', [LoginController::class, 'login']);
$router->get('/logout', [LoginController::class, 'logout']);


//Recuperar password
$router->get('/olvide', [LoginController::class, 'olvide']);
$router->post('/olvide', [LoginController::class, 'olvide']);
$router->get('/recuperar', [LoginController::class, 'recuperar']);
$router->post('/recuperar', [LoginController::class, 'recuperar']);


//Crear cuentas
$router->get('/crear-cuentas', [LoginController::class, 'crear']);
$router->post('/crear-cuentas', [LoginController::class, 'crear']);

//Confirmar cuenta
$router->get('/confirmar-cuenta', [LoginController::class, 'confirmar']);

$router->get('/mensaje', [LoginController::class, 'mensaje']);

//Area Privada

$router->get('/cita', [CitaController::class,'index']);
$router->get('/admin', [AdminController::class,'index']);


//Api de citas
$router->get('/api/servicios',[ApiController::class,'index']);
$router->post('/api/citas', [ApiController::class,'guardar']);
$router->post('/api/eliminar',[ApiController::class,'eliminar']);

//CRUD de Servicios
$router->get('/servicios', [ServicioController::class,'index']);
$router->get('/servicios/crear', [ServicioController::class, 'crear']);
$router->post('/servicios/crear', [ServicioController::class, 'crear']);
$router->get('/servicios/actualizar', [ServicioController::class, 'actualizar']);
$router->post('/servicios/actualizar', [ServicioController::class, 'actualizar']);
$router->post('/servicios/eliminar', [ServicioController::class, 'eliminar']);





// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();