    <?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    include("conexion.php");
    
    $response = [];
    $profesores = array();    

    $sql = "";
	$sql .= " SELECT p.nombre as nombreprofesor, p.proyecto, e.cedula as cedulaestudiante, e.nombres as nombreestudiante, e.apellidos as apellidoestudiante, e.curso, e.paralelo";
	$sql .= " FROM profesores_estudiantes pe ";
	$sql .= " INNER JOIN profesores p on p.codigoprofesor = pe.codigoprofesor ";
	$sql .= " INNER JOIN estudiantes e on e.codigoestudiante = pe.codigoestudiante ";
	$sql .= " WHERE 1=1 ";
	$sql .= " AND pe.estado = '1' ";
	$sql .= " AND p.estado = '1' ";
	$sql .= " AND e.estado = '1' ";
	$sql .= " ORDER BY p.nombre, e.nombres, e.apellidos";

    $result = mysqli_query($con, $sql);
	
	$response['sql'] = $sql;
	
	if ($result) {
		$rows = mysqli_num_rows($result);
		if ($rows == 0) {
			$response['mensaje'] = "No se encontro la lista de estudiantes";
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