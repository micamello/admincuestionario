//$(document).ready(function(){

	function generarGrafico(id_usuario,ruta){

	    var datos = $('#datosGrafico').val();
	    datos = datos.split('|');
	    
	    var arreglo = [['Task', 'Hours per Day']];
	    for (var i = 0; i < datos.length; i++) {

	    	var porcion = datos[i].split(',');

	    	porcion[1] = parseFloat(porcion[1]);
	        arreglo.push(porcion);
	    }

	    var puerto_host = $('#puerto_host').val();
	    google.charts.load("current", {packages:["corechart"]});
	    google.charts.setOnLoadCallback(drawChart);
	    function drawChart() {
	        var data = google.visualization.arrayToDataTable(arreglo);

	        var options = {
	          pieSliceText: 'label',
	          is3D: true,
	          width:4000,
	          height:2600,
	          pieSliceTextStyle: {color: 'black', fontName: 'dsfd', fontSize: 80},
	          fontSize:80,
	          legend: 'none',
	          slices: {
	            0: { color: '#ffd966' },
	            1: { color: '#ff7575' },
	            2: { color: '#a86ed4' },
	            3: { color: '#4b98dd' },
	            4: { color: '#a8d08d' }
	          }
	        };

	        document.getElementById('Chart_details').style.display='block';
	        var chart_1 = new google.visualization.PieChart(document.getElementById('g_chart_1'));
	        chart_1.draw(data, options);
	        var chart_div = document.getElementById('chart_div');

	        google.visualization.events.addListener(chart_1, 'ready', function () {

	        	var uri = chart_1.getImageURI();
	        	document.getElementById('Chart_details').style.display='none';
				//chart_div.innerHTML = '<img width="600" heigth="600" align="center" src="'+uri+'">';

		       /*$.ajax({
		            type: "POST",
			        url: puerto_host+"/index.php?mostrar=minisitio&opcion=guardarGrafico",
			        data: {id_usuario:id_usuario, imagen:uri},
			        async : false,
		       }).done(function(data) {
		       	console.log('<img width="600" heigth="600" align="center" src="'+uri+'">');
		          redirigir(ruta);
		       });*/
		       /*$.ajax({
         	type: "POST",
	        url: puerto_host+"/index.php?mostrar=minisitio&opcion=guardarGrafico",
	        data: {id_usuario:id_usuario, imagen:uri},
	        dataType:'json',
       }).done(function(data) {
          //ruta = data.guardo; //set the data

          if(ruta){
          	console.log('ruta1: '+ruta);
          	//redirigir(ruta);
          }
          
       });*/
       deferredCalls (ruta,id_usuario,uri);
	            
	        });

	        //chart_1.draw(data, options);
	    }
	}
//);

function deferredCalls (ruta1,id_usuario,uri) {
   var ruta = '';
   function f1()
   {
       // ajax call 
       $.ajax({
         	type: "POST",
	        url: puerto_host+"/index.php?mostrar=minisitio&opcion=guardarGrafico",
	        data: {id_usuario:id_usuario, imagen:uri},
	        dataType:'json',
       }).done(function(data) {
          ruta = data.guardo; //set the data

          if(ruta){
          	console.log('ruta1: '+ruta1);
          	redirigir(ruta1);
          }
          
       });
   }

   function f2()
   {
     // do some of the work based on data
     console.log('ruta2: '+ruta);
   }

   f1().done(f2);
 }

function hacerInforme(ruta,id_usuario,metodo){

	var puerto_host = $('#puerto_host').val();
	$.ajax({
        type: "POST",
        url: puerto_host+"/index.php?mostrar=minisitio&opcion=consultarPorcentajesFacetas",
        data: {id_usuario:id_usuario, metodo:metodo},
        dataType:'json',
        success(resultado){

        	//if(parseInt(resultado.existeGrafico) == 0){
            	$('#datosGrafico').val(resultado.graficar);
            	generarGrafico(id_usuario,ruta);
            	
            /*}else{
            	console.log('existe');
            	redirigir(ruta);
            }*/
        }
    });
}


function redirigir(ruta){
	window.location = ruta+'/';
}


if(document.querySelector( "form" )){
	document.querySelector( "form" )
	.addEventListener( "invalid", function( event ) {
	    event.preventDefault();
	}, true );
}

$(document).ready(function() {

	document.getElementById('Chart_details').style.display='none';

    $('#cuestionarios').DataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
        }
    } );
  
} );

// DEPENDENCIAS
var puerto_host = $('#puerto_host').val();

$('#pais').on('change', function(){
	var id_pais = $(this).val(); 
	if (id_pais != "" && id_pais == 14) {
	        $.ajax({
	            type: "GET",
	            url: puerto_host+"?mostrar=regtest&opcion=buscaProvincia&id_pais="+id_pais,
	            dataType:'json',
	            success:function(data){
	                $('#provincia').html('<option value="">Selecciona una provincia</option>');
	                console.log(data);
	                $.each(data, function(index, value) {
	                    $('#provincia').append("<option value='"+index+"'>"+value+"</option>");

	                });
	            },
	            error: function (request, status, error) {
	                alert(request.responseText);
	            }
	        });
		$('#provincia_content').css('display', '');
		$('#cantonnac').attr('disabled', '');
		$('#cantonnac_content').css('display', '');
	}
	else{
		$('#provincia').html('<option value="">Selecciona una provincia</option>');
		$('#cantonnac').html('<option value="">Selecciona un cantón</option>');
		$('#provincia_content').css('display', 'none');
		$('#cantonnac_content').css('display', 'none');
		eliminarMensajeError($('#provincia'), '');
		eliminarMensajeError($('#cantonnac'), '');
	}
});

$('#provincia').on('change', function(){
	var id_provincia = $(this).val();
	if(id_provincia != ""){
		$.ajax({
	            type: "GET",
	            url: puerto_host+"?mostrar=regtest&opcion=buscaCiudad&id_provincia="+id_provincia,
	            dataType:'json',
	            success:function(data){
	                $('#cantonnac').html('<option value="">Selecciona un cantón</option>');
	                console.log(data);
	                $.each(data, function(index, value) {
	                    $('#cantonnac').append("<option value='"+value.id_ciudad+"'>"+value.ciudad+"</option>");
	                });
	            },
	            error: function (request, status, error) {
	                alert(request.responseText);
	            }
	        });
		$('#cantonnac').removeAttr('disabled');
	}
});

$('#provincia_res').on('change', function(){
	var id_provincia = $(this).val();
	if(id_provincia != ""){
		$.ajax({
	            type: "GET",
	            url: puerto_host+"?mostrar=regtest&opcion=buscaCiudad&id_provincia="+id_provincia,
	            dataType:'json',
	            success:function(data){
	                $('#canton_res').html('<option value="">Selecciona un cantón</option>');
	                console.log(data);
	                $.each(data, function(index, value) {
	                    $('#canton_res').append("<option value='"+value.id_ciudad+"'>"+value.ciudad+"</option>");
	                });
	            },
	            error: function (request, status, error) {
	                alert(request.responseText);
	            }
	        });
		$('#canton_res').removeAttr('disabled');
	}
});

$('#canton_res').on('change', function(){
	var id_canton = $(this).val();
	if(id_canton != ""){
		$.ajax({
	            type: "GET",
	            url: puerto_host+"?mostrar=regtest&opcion=buscaParroquia&id_canton="+id_canton,
	            dataType:'json',
	            success:function(data){
	                $('#parroquia_res').html('<option value="">Selecciona una parroquia</option>');
	                console.log(data);
	                $.each(data, function(index, value) {
	                    $('#parroquia_res').append("<option value='"+value.id_parroquia+"'>"+value.descripcion+"</option>");
	                });
	            },
	            error: function (request, status, error) {
	                alert(request.responseText);
	            }
	        });
		$('#parroquia_res').removeAttr('disabled');
	}
});
// DEPENDENCIAS
//Validaciones
var mensaje_error = "";
$('#nombres').on('blur', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#apellidos').on('blur', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#fecha_nacimiento').on('blur', function(){
	emptyField(this);
	// validarCaracteresPermitidos('fecha', $(this));
});

$('#genero').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#pais').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#provincia').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#cantonnac').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#estado_civil').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#nivel_instruccion').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#profesion').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#ocupacion').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#provincia_res').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#canton_res').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#parroquia_res').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#correo').on('blur', function(){
	emptyField(this);
	// validarCaracteresPermitidos('correo', $(this));
});

$('#aspiracion_salarial').on('blur', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

$('#terminos_condiciones').on('change', function(){
	emptyField(this);
	// validarCaracteresPermitidos('nombre_apellido', $(this));
});

// inicializar campos del formulario
function camposFormulario(){
	var camposForm = [];
	if($('#nombres').length){
		var nombres_field = $('#nombres');
		camposForm.push(nombres_field);
	}
	if($('#apellidos').length){
		var apellidos_field = $('#apellidos');
		camposForm.push(apellidos_field);
	}
	if($('#fecha_nacimiento').length){
		var fecha_nacimiento_field = $('#fecha_nacimiento');
		camposForm.push(fecha_nacimiento_field);
	}
	if($('#genero').length){
		var genero_field = $('#genero');
		camposForm.push(genero_field);
	}
	if($('#pais').length){
		var pais_field = $('#pais');
		camposForm.push(pais_field);
	}
	// dependencias start
	if($('#provincia_content:visible').length == 1){
		if($('#provincia').length){
			var provincia_field = $('#provincia');
			camposForm.push(provincia_field);
		}
	}
	if($('#cantonnac_content:visible').length == 1){
		if($('#cantonnac').length){
			var cantonnac_field = $('#cantonnac');
			camposForm.push(cantonnac_field);
		}
	}
	// dependencias end
	if($('#estado_civil').length){
		var estado_civil_field = $('#estado_civil');
		camposForm.push(estado_civil_field);
	}
	if($('#nivel_instruccion').length){
		var nivel_instruccion_field = $('#nivel_instruccion');
		camposForm.push(nivel_instruccion_field);
	}
	if($('#profesion').length){
		var profesion_field = $('#profesion');
		camposForm.push(profesion_field);
	}
	if($('#ocupacion').length){
		var ocupacion_field = $('#ocupacion');
		camposForm.push(ocupacion_field);
	}
	if($('#provincia_res').length){
		var provincia_res_field = $('#provincia_res');
		camposForm.push(provincia_res_field);
	}
	if($('#canton_res').length){
		var canton_res_field = $('#canton_res');
		camposForm.push(canton_res_field);
	}
	if($('#parroquia_res').length){
		var parroquia_res_field = $('#parroquia_res');
		camposForm.push(parroquia_res_field);
	}
	if($('#correo').length){
		var correo_field = $('#correo');
		camposForm.push(correo_field);
	}
	if($('#aspiracion_salarial').length){
		var aspiracion_salarial_field = $('#aspiracion_salarial');
		camposForm.push(aspiracion_salarial_field);
	}
	if($('#terminos_condiciones').length){
		var terminos_condiciones_field = $('#terminos_condiciones');
		camposForm.push(terminos_condiciones_field);
	}
	return camposForm;
}

function ValidarCamposVacios(campos){
	for (var i = 0; i < campos.length; i++) {
		emptyField(campos[i]);
	}
}

function errorCountMessage(){
	var number = $('.error_field').length;
	console.log(number);
	return number;
}
 // || $(obj)[0].checked != 1
function emptyField(obj){
	if($(obj).prop('type') != 'checkbox'){
		if($(obj).val() == "" || $(obj).val() == null){
			if($(obj).prop('tagName') == 'SELECT'){
				mensaje_error = "Seleccione una opción";
			}
			else{
				mensaje_error = "Rellene este campo";
			}
			crearMensajeError(obj, mensaje_error);
		}
		else{
			mensaje_error = "";
			eliminarMensajeError(obj, mensaje_error);
		}
	}
	else{
		if($(obj).prop('type') == 'checkbox'){
			if(!$(obj).is(':checked')){
				mensaje_error = "Debe aceptar términos y condiciones";
				crearMensajeError(obj, mensaje_error);
			}
			else{
				mensaje_error = "";
					eliminarMensajeError(obj, mensaje_error);
			}
		}
	}
}

function crearMensajeError(obj, mensaje){
	console.log(mensaje);
	$(obj).siblings('div').html(mensaje_error);
	$(obj).siblings('div').addClass('error_field');
}

function eliminarMensajeError(obj, mensaje){
	$(obj).siblings('div').html(mensaje_error);
	$(obj).siblings('div').removeClass('error_field');
}
//Validaciones
$('#form_registrotest').on('submit', function(event){
	ValidarCamposVacios(camposFormulario());
	if(errorCountMessage() > 0){
		event.preventDefault();
	}
	// errorCountMessage();
	
	// event.preventDefault();
});

function validarCaracteresPermitidos(tipo, contenido){
	// console.log(contenido);
	var tipo_validacion = [];
	tipo_validacion.push(["nombre_apellido", ['El ' +contenido.siblings('label').text()+ ' ingresado no es válido', validarNombreApellido(contenido[0].value)]]);
	tipo_validacion.push(["correo", ['El ' +contenido.siblings('label').text()+ ' ingresado no es válido', validarCorreo(contenido[0].value)]]);
	tipo_validacion.push(["fecha", ['El ' +contenido.siblings('label').text()+ ' ingresado no es válido', validarFecha(contenido[0].value)]]);
	// console.log(tipo_validacion);
	if (tipo == tipo_validacion[0][0] && (contenido[0].value != null && contenido[0].value != "")) {
		if(!(tipo_validacion[0][1][1])){
			console.log("----------------");
			crearMensajeError(contenido[0], tipo_validacion[0][1][0]);
		}
		else{
			eliminarMensajeError(contenido[0]);
		}
	}
	if (tipo == tipo_validacion[1][0] && (contenido[0].value != null && contenido[0].value != "")) {
		if(!(tipo_validacion[1][1][1])){
			crearMensajeError(contenido[0], tipo_validacion[1][1][0]);
		}
		else{
			eliminarMensajeError(contenido[0]);
		}
	}
	if (tipo == tipo_validacion[2][0] && (contenido[0].value != null && contenido[0].value != "")) {
		if(!(tipo_validacion[2][1][1])){
			crearMensajeError(contenido[0], tipo_validacion[2][1][0]);
		}
		else{
			eliminarMensajeError(contenido[0]);
		}
	}
};

function validarCorreo(correo) { 
	// console.log(correo);
  return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(correo);
}

function validarNombreApellido(nombre){
	// console.log(nombre);
	return /^[A-Za-zÁÉÍÓÚñáéíóúÑ ]+?$/.test(nombre);
}

function validarFecha(fecha){
	// console.log(fecha);
	return /^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/.test(fecha);
}


$("#ocupaciones").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$("#listaOcupaciones li").filter(function() {
	  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});

$("#profesiones").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$("#listaProfesiones li").filter(function() {
	  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});

$("#nacionalidades").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$("#menu1 li").filter(function() {
	  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});

$("#residencia").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$("#menu2 li").filter(function() {
	  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});

$("#competencias").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$("#menu3 li").filter(function() {
	  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});

function enviarPclave(ruta){

	window.location = ruta;
}