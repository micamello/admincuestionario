<?php
ignore_user_abort( true );
ini_set("max_execution_time", "0");
ini_set("max_input_time", "0");
ini_set('memory_limit', "768M");
set_time_limit(0);

/*Script que guardara las conbinaciones posibles en el baremos*/

require_once '../constantes.php';
require_once '../init.php';

//pregunta si ya se esta ejecutando el cron sino crea el archivo
$resultado = file_exists(CRON_RUTA.'resultadosxpreguntas.txt');
if ($resultado){
  exit;
}
else{
  Utils::crearArchivo(CRON_RUTA,'resultadosxpreguntas.txt','');
}

//$result_set = Modelo_Usuario::obtieneTodosCandidatos();
//while( $rows = mysqli_fetch_array( $result_set, Database::ASSOC) ){
	
//}

//elimina archivo de procesamiento
unlink(CRON_RUTA.'resultadosxpreguntas.txt');
?>