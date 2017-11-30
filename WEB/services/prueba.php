<?php
//this file obtain data for customer depends session['email'] value
session_start();




	$db_host = "localhost"; 	// Location of the database
	$db_user = "root";       				// Username for the access
	$db_pass = "";       			// Password for the access
	$db_name = "prestamos";       			// Name of the database


$con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);


    
    $sql = "SELECT * FROM noticias";
    
    $res = mysqli_query($con, $sql);
    
    while($data = mysqli_fetch_assoc($res))
    {
        echo $data['tituloNot'];
    }


mysqli_close($con);

?>