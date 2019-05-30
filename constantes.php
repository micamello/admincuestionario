<?php
define('PUERTO', 'http');
define('FRONTEND_RUTA', 'C:/wamp64/www/admincuestionario/');
define('DBSERVIDOR', 'localhost');
define('DBUSUARIO', 'root'); 
define('DBNOMBRE', 'micamell_desarrollo2');
define('DBNOMBRE2', 'micamello_cuestionarios');
define('DBCLAVE', '');     
define('RUTA_INCLUDES', FRONTEND_RUTA.'includes/');
define('RUTA_FRONTEND', FRONTEND_RUTA.'frontend/'); 
define('RUTA_VISTA', FRONTEND_RUTA.'frontend/Vista/');
define('CLASES_ESTATUS',array('1'=>'alert-success','2'=>'alert-danger','3'=>'alert-warning'));
define('ESTADOS',array('1'=>'Activo','0'=>'Inactivo'));
define('STATUS_CARRERA', array('1'=>'Estudiante', '2'=>'Graduado'));
define('POSTULACIONES', array('2'=>'Manual', '1'=>'Autom&aacute;tico'));
define('GENERO', array('M'=>'Masculino', 'F'=>'Femenino', 'P'=>'Prefiero no decirlo'));
define('VALOR_GENERO', array('M'=>'1', 'F'=>'2', 'P'=>'3'));
define('MESES', array('01'=>'Enero', '02'=>'Febrero', '03'=>'Marzo', '04'=>'Abril','05'=>'Mayo', '06'=>'Junio', '07'=>'Julio', '08'=>'Agosto','09'=>'Septiembre', '10'=>'Octubre', '11'=>'Noviembre', '12'=>'Diciembre'));
define('ANOSEXP', array('1'=>'Sin Experiencia', '2'=>'1 - 3 a&ntilde;os', '3'=>'4 - 6 a&ntilde;os', '4'=>'7 - 10 a&ntilde;os', '5'=>'M&aacute;s de 10 a&ntilde;os'));
define('REGISTRO_PAGINA',10);
define('REQUISITO', array('0'=>'No', '1'=>'S&iacute;'));
define('ESTADO_CIVIL',array('1'=>'Soltero(a)', '2'=>'Unión libre', '3'=>'Casado(a)', '4'=>'Separado(a)','5'=>'Divorciado(a)','6'=>'Viudo(a)','7'=>'Otro'));
define('TIPO_DOCUMENTO', array('1'=>'RUC','2'=>'CÉDULA','3'=>'PASAPORTE'));
define('DOCUMENTACION', array('2'=>'CÉDULA', '3'=>'PASAPORTE'));
define('EDAD', array('1'=>'Entre 18 y 20 a&ntilde;os', '2'=>'Entre 20 y 30 a&ntilde;os','3'=>'Entre 30 y 40 a&ntilde;os','4'=>'Entre 40 y 50 a&ntilde;os','5'=>'M&aacute;s de 50 a&ntilde;os'));
define('OPCIONES',array('a','b','c','d','e'));
define('METODO_CUESTIONARIO',array('0'=>'Preguntas ordenadas','1'=>'Preguntas aleatorias'));
?>