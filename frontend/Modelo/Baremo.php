<?php
class Modelo_Baremo{
  
  public static function obtienePuntaje($orden1='',$orden2='',$orden3='',$orden4='',$orden5=''){
  	if (empty($orden1) || empty($orden2) || empty($orden3) || empty($orden4) || empty($orden5)){ return false; }
    $sql = "SELECT porcentaje, id_puntaje 
            FROM mfo_baremo 
            WHERE orden1 = ? AND orden2 = ? AND orden3 = ? AND orden4 = ? AND orden5 = ?
            LIMIT 1";
    return $GLOBALS['db']->auto_array($sql,array($orden1,$orden2,$orden3,$orden4,$orden5));
  }
  
  public static function obtieneListadoAsociativo(){

		$sql = "SELECT b.id_puntaje, b.porcentaje, d.id_faceta, d.descripcion FROM mfo_baremo2 b , mfo_descriptor2 d WHERE d.id_puntaje = b.id_puntaje ORDER BY id_faceta";
    	$arrdatos = $GLOBALS['db']->auto_array($sql,array(),true);

		$datos = array();
		if (!empty($arrdatos) && is_array($arrdatos)){

			foreach ($arrdatos as $key => $value) {
				$datos[$value['id_faceta']][$value['porcentaje']] = array('id_puntaje'=>$value['id_puntaje'],'descripcion'=>$value['descripcion']);
			}
		}
		return $datos;
	}
}  
?>