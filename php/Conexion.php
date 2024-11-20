<?php

//Credenciales de acceso
$SERVER = "localhost";
$DATABASE = "web_page";
$USER = "root";
$PASSWORD = "";

//Conexión a la base de datos
$CONECCTION = mysqli_connect($SERVER,$USER,$PASSWORD,$DATABASE);

if(!$CONECCTION){
    mysqli_close($CONECCTION);
    exit();
}
/*COMPROBAR CONEXIÓN*/
/*If($CONECCTION){
    ECHO "Conexion exitosa";
}else {
    ECHO "fallo la conexion";
    }*/
?>