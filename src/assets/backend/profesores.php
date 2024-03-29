    <?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("conexion.php");
    
    $response = [];
    $profesores = array();    

    $sql = "SELECT p.codigoprofesor, p.nombre, count(pe.codigoestudiante) cantidad, p.cantidad_max cantidadMax, p.proyecto, p.cursos ";
	$sql .= "FROM profesores p left join profesores_estudiantes pe on pe.codigoprofesor = p.codigoprofesor ";
	$sql .= "group by p.codigoprofesor, p.nombre";

    $result = mysqli_query($con, $sql);
	
	$response['sql'] = $sql;
	
	if ($result) {
		$rows = mysqli_num_rows($result);
		if ($rows == 0) {
			$response['mensaje'] = "No se encontro la lista de profesores";
		} else {
			while ($row = mysqli_fetch_assoc($result)) {
				$profesores[] = $row;
			}
            $response['error'] = "0";
        }
    } else {
		$response['mensaje'] = mysqli_errno($con) . ": " . mysqli_error($con);
        $response['error'] = "1";
    }

    $response['profesores'] = $profesores;

    echo json_encode($response);