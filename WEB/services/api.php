<?php

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	
 	require_once("Rest.inc.php");
	
	class API extends REST{
		
		public $data = "";
		
		const DB_SERVER = "localhost";
		const DB_USER = "root";
		const DB_PASSWORD = "";
		const DB = "prestamos";

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}
		
		/*
		 *  Connect to Database
		*/
		private function dbConnect(){
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);

		}
		
		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // If the method not exist with in this class "Page not found".
		}
				
		private function login(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$JSON       = file_get_contents("php://input");
			$request    = json_decode($JSON,true);
		
			$usuario    = $request['usuario']; 
			$password = $request['password'];	

					$query="SELECT * FROM `administrador` WHERE `admin_user`= '$usuario' AND `admin_password`='$password'"  ;
					$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
					if($r->num_rows > 0) {
						session_start();
						//$this->response('1', 200);
						$_SESSION['username'] = $usuario;
						// send user details
					}	// If no records "No Content" status
					else{
						$this->response('0', 200);	
					}
		}
		
		private function articulos(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT * FROM articulos";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = array_map('utf8_encode',$row);
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}



		private function alumnos(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT alumno_matricula,alumno_nombre,
			CONCAT(alumno_apellidop,'  ',alumno_apellidom) as apellidos, alumno_carrera 
			FROM alumnos";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = array_map('utf8_encode',$row);
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}

		private function prestamos(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT * FROM prestamos";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = array_map('utf8_encode',$row);
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}

		private function articulosPrestamo(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			$query="SELECT t1.articulo_id as artID,articulo_nombre,linea_unidades FROM `linesprestamo` t1 INNER JOIN `articulos` t2 ON t1.articulo_id = t2.articulo_id WHERE `prestamo_id`=$id ";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = array_map('utf8_encode',$row);
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}

		//funcion para obtener el alumno por ID
		private function alumno(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			
				$query="SELECT * FROM alumnos c WHERE c.alumno_matricula=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();	
					$result = array_map('utf8_encode', $result);
					$this->response($this->json($result), 200); // send user details
				}
			
			$this->response('',204);	// If no records "No Content" status
		}

	


		private function valalum(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			
				$query="SELECT * FROM alumnos c WHERE c.alumno_matricula=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					
					$this->response("1", 200); // send user details
				}else{
                    $this->response("0", 200);
                }
			
			$this->response('',204);	// If no records "No Content" status
		}

		private function prestamo(){	

			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			
				$query="SELECT * FROM prestamos c WHERE c.prestamo_id=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();	
					$result = array_map('utf8_encode', $result);
					$this->response($this->json($result), 200); // send user details
				}else{
                    $this->response("0", 200);
                }
			
			$this->response('',204);
		}
		
		
		private function insertAlumno(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$alumno =  json_decode(file_get_contents("php://input"),true);
			$column_names = array('alumno_matricula', 'alumno_nombre', 'alumno_apellidop', 'alumno_apellidom', 'alumno_carrera');
			$keys = array_keys($alumno);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = utf8_decode($alumno[$desired_key]);
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO alumnos(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($alumno)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $alumno);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}

		private function insertPrestamo(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$prestamo =  json_decode(file_get_contents("php://input"),true);
			$column_names = array('prestamo_id', 'alumno_matricula');
			$keys = array_keys($prestamo);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = utf8_decode($prestamo[$desired_key]);
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO prestamos(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($prestamo)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$acentos = $db->query("SET NAMES 'utf8'");
				$success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $prestamo);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}

		private function crearLista(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$articulo =  json_decode(file_get_contents("php://input"),true);
			$column_names = array('prestamo_id', 'linea_unidades', 'articulo_id');
			$keys = array_keys($articulo);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = utf8_decode($articulo[$desired_key]);
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO linesprestamo(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($articulo)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$acentos = $db->query("SET NAMES 'utf8'");
				$success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $articulo);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}
		

		private function updateAlumno(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$alumno = json_decode(file_get_contents("php://input"),true);
			$id = (int)$alumno['id'];
			$column_names = array('alumno_nombre', 'alumno_apellidop', 'alumno_apellidom', 'alumno_carrera');
			$keys = array_keys($alumno['alumno']);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the alumno received. If key does not exist, insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = utf8_decode($alumno['alumno'][$desired_key]);
				}
				$columns = $columns.$desired_key."='".$$desired_key."',";
			}
			$query = "UPDATE alumnos SET ".trim($columns,',')." WHERE alumno_matricula=$id";
			if(!empty($alumno)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "alumno ".$id." Updated Successfully.", "data" => $alumno);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status
		}

		

		private function updatePrestamo(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$prestamo = json_decode(file_get_contents("php://input"),true);
			$id = (int)$prestamo['id'];

			
			$query = "UPDATE prestamos SET prestamo_fecha_devolucion=CURDATE(), prestamo_estado='Devuelto' WHERE prestamo_id=$id";
			if($id > 0){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Customer ".$id." Updated Successfully.");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status
		}

		private function deleteAlumno(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){				
				$query="DELETE FROM alumnos WHERE alumno_matricula = $id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}
		
		
		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}
	
	// Initiiate Library
	
	$api = new API;
	$api->processApi();
?>