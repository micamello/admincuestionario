<?php
class Modelo_Opcion{

	public static function datosGraficos($id_usuario,$base=0){
		if (empty($id_usuario)){ return false; }
		$sql = 'SELECT t.id_faceta,sum(b.porcentaje) as prom, sum(id_competencia) as cantd_competencias FROM (SELECT GROUP_CONCAT(r.orden_seleccion ORDER BY o.valor) as puntaje, c.id_faceta, (1) as id_competencia
		FROM mfo_opcionm2 o
		INNER JOIN mfo_respuestam2 r on r.id_opcion = o.id_opcion
		INNER JOIN mfo_preguntam2 p on p.id_pregunta = o.id_pregunta
		INNER JOIN mfo_competenciam2 c on c.id_competencia = p.id_competencia
		WHERE r.id_usuario = ?
		GROUP BY c.id_competencia) t
		INNER JOIN mfo_baremo b ON b.orden1 = (SUBSTR(t.puntaje, 1, 1)) AND 
		 b.orden2 = (SUBSTR(t.puntaje, 3, 1)) AND 
		 b.orden3 = (SUBSTR(t.puntaje, 5, 1)) AND 
		 b.orden4 = (SUBSTR(t.puntaje, 7, 1)) AND 
		 b.orden5 = (SUBSTR(t.puntaje, 9, 1))
		GROUP BY id_faceta
		ORDER BY id_faceta';

		if (empty($base)){
		  $arrdatos = $GLOBALS['db']->auto_array($sql,array($id_usuario),true);
		}
    else{
    	$arrdatos = $GLOBALS['db2']->auto_array($sql,array($id_usuario),true);
    } 
		$datos = array();
		if (!empty($arrdatos) && is_array($arrdatos)){

			foreach ($arrdatos as $key => $value) {
				$datos[$value['id_faceta']] = array();
			}

			foreach ($arrdatos as $key => $value) {
				$datos[$value['id_faceta']] = array($value['prom'],$value['cantd_competencias']);
			}
		}
		return $datos;
	}

}  
?>