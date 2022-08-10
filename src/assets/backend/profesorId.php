<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
	include("conexion.php");
    
    $response = [];
    $profesor = null;
	
    $codigoprofesor = mysqli_real_escape_string($con,(strip_tags($_GET["codigoprofesor"],ENT_QUOTES)));
    
	$sql = "SELECT p.codigoprofesor, p.nombre, count(pe.codigoestudiante) cantidad ";
	$sql .= "FROM profesores p left join profesores_estudiantes pe on pe.codigoprofesor = p.codigoprofesor ";
	$sql .= "where p.codigoprofesor = '$codigoprofesor' ";
	$sql .= "group by p.codigoprofesor, p.nombre ";

    $result = mysqli_query($con, $sql);
	
	$response['sql'] = $sql;

    if ($result) {
		$rows = mysqli_num_rows($result);
		if ($rows == 0) {
			$response['mensaje'] = "El profesor no tiene estudiantes asignados";
		} else {
			while ($row = mysqli_fetch_assoc($result)) {
				$profesor = $row;
			}
            $response['error'] = "0";
        }
    } else {
		$response['mensaje'] = mysqli_errno($con) . ": " . mysqli_error($con);
        $response['error'] = "1";
    }

    $response['profesor'] = $profesor;
        
    echo json_encode($response);