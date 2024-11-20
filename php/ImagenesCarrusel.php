<?php

/*
Inclusión del archivo "Conexion.php" para realizar la conexión a la BD. 
*/
require 'php/Conexion.php';

/*----------------------------------------------------------------------------*/

/*
queries para la obtencion de la ID,nombre,referencia,descripcion y ubicacion
de los ultimos cinco valores de la tabla imagen, esto con el fin de obtener 
las cinco imagenes mas recientes y por consecuencia, 
las cinco noticias más recientes.
*/
$query = "SELECT imagen_id FROM imagen ORDER BY imagen_id DESC LIMIT 9;";
$query .= "SELECT nombre FROM imagen ORDER BY imagen_id DESC LIMIT 9;";
$query .= "SELECT referencia FROM imagen ORDER BY imagen_id DESC LIMIT 9;";
$query .= "SELECT descripcion FROM imagen ORDER BY imagen_id DESC LIMIT 9;";
$query .= "SELECT ubicacion FROM imagen ORDER BY imagen_id DESC LIMIT 9;";
/*
Arreglos para almacenar el ID,nombre,referencia,descripcion y ubicacion
de las cinco imagenes mas recientes obtenidas por los queries anteriores.
*/
$noticiasID = array();
$noticiasNombre = array();
$noticiasReferencia = array();
$noticiasDescripcion = array();
$noticiasUbicacion = array();
/*
Indices para los arreglos anteriores.
*/
$indiceArreglos = 0;
$indiceSwitch = 0;

if (mysqli_multi_query($CONECCTION, $query)) {
    do{    
        /*
        Se realiza la consulta de los resultados obtenidos por el query
        */
        if ($result = mysqli_store_result($CONECCTION)) {
            /*
            el siguiente while es para obtener todos los resultados obtenidos por el query.
            */
            while ($row = mysqli_fetch_row($result)) { //Row es un arreglo que irá almacenando valores de forma temporal.
                /*
                El siguiente switch es para poder almacenar en cada arrelgo los
                datos que deben de almacenar por separado entre ellos.
                */
                switch($indiceSwitch){
                    case 0:
                        $noticiasID[$indiceArreglos] = $row[0];// Almacenado del valor dentro del arreglo en la posicion indice.
                        $indiceArreglos++;// Aumento del indice.
                        break;
                    case 1:
                        $noticiasNombre[$indiceArreglos] = $row[0];// Almacenado del valor dentro del arreglo en la posicion indice.
                        $indiceArreglos++;// Aumento del indice.
                        break;
                    case 2:
                        $noticiasReferencia[$indiceArreglos] = $row[0];// Almacenado del valor dentro del arreglo en la posicion indice.
                        $indiceArreglos++;// Aumento del indice.
                        break;
                    case 3:
                        $noticiasDescripcion[$indiceArreglos] = $row[0];// Almacenado del valor dentro del arreglo en la posicion indice.
                        $indiceArreglos++;// Aumento del indice.
                        break;
                    case 4:
                        $noticiasUbicacion[$indiceArreglos] = $row[0];// Almacenado del valor dentro del arreglo en la posicion indice.
                        $indiceArreglos++;// Aumento del indice.
                        break;
                    case 5:
                        $noticiasUbicacion[$indiceArreglos] = $row[0];// Almacenado del valor dentro del arreglo en la posicion indice.
                        $indiceArreglos++;// Aumento del indice.
                        break;
                    case 6:
                        $noticiasUbicacion[$indiceArreglos] = $row[0];// Almacenado del valor dentro del arreglo en la posicion indice.
                        $indiceArreglos++;// Aumento del indice.
                        break;
                    case 7:
                        $noticiasUbicacion[$indiceArreglos] = $row[0];// Almacenado del valor dentro del arreglo en la posicion indice.
                        $indiceArreglos++;// Aumento del indice.
                        break;
                    case 8:
                        $noticiasUbicacion[$indiceArreglos] = $row[0];// Almacenado del valor dentro del arreglo en la posicion indice.
                        $indiceArreglos++;// Aumento del indice.
                        break;
                    default:
                        break;
                }//Switch                  
            }//while
            mysqli_free_result($result); //Liberamos el valor de la variable.
        }//if
        $indiceArreglos = 0;// Se resetea el valor del indice de los arreglos, para reutilizar en indice en cada arreglo.
        $indiceSwitch++;// Incrementa el indice del switch, para cambiar de arreglo.
    }while(mysqli_next_result($CONECCTION)); //do-while    
}//if
?>