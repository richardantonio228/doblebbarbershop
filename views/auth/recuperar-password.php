<h1 class="recuperar-pagina">Recuperar Password </h1>
<p class="descripcion-pagina">Coloca tu nuevo password</p>

<?php
include_once __DIR__ . "/../templates/alertas.php";
?>

<?php if($error) return; ?>



<form class="formulario"  method="POST">
    <div class="campo">
        <label for="password">Password</label>
        <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Tu Nuevo Password" 
        />
    </div>
    <input type="submit" class="boton" value="Guardar Nuevo Password">
</form>
<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia sessión<a>
            <a href="/crear-cuentas">¿Aún no tienes una cuenta? Crear una</a>
</div>