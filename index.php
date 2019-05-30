<?php
require_once 'constantes.php';
require_once 'init.php';
include 'multisitios.php';

dispatch();
$GLOBALS['db']->close();

function dispatch() {
    global $_SUBMIT;
    $pagina = Utils::getParam('mostrar', 'inicio');
    $controlador_nombre = obtieneControlador($pagina);
    $clase = 'Controlador_' . $controlador_nombre;
    if(class_exists($clase)){
      $controlador = new $clase();
    }else{
      //no existe controlador
    }
    return $controlador->construirPagina();
  }
  
function obtieneControlador($nombre){
  switch($nombre){    
    case 'fileGEN':
      return 'GenerarPDF';
    break;        
    default:
      return 'Minisitio'; 
    break;
  }
  return ucfirst($nombre);
}
?>