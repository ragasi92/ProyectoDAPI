<?php
session_start();
if(!isset($_SESSION['username'])){
	header ("Location: index.html");
}
?>
<!DOCTYPE html>
<html ng-app="myApp" ng-app>
<head>	
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Préstamos UAZ Campus Jalpa</title>
	<link rel="stylesheet" href="css/bootstrap-3.3.4/bootstrap.min.css">
	<link rel="stylesheet" href="css/bootstrap-3.3.4/bootstrap-theme.min.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/angular.min.js"></script>
	<script src="js/angular-route.min.js"></script>
	<script src="app/cart.js"></script>
	<script src="app/app.js"></script>
	<script src="app/dirPagination.js"></script>

</head>
<body>
	<div class="container">
		<div class="row-fluid">
			<div class="header">
					<div id="logo">
						<a href="inicial.html"><img src="images/logo.png" width="80%" height="80%" class="img-responsive"></a>
					</div>	
					<div id="f">
						<p class="text-right fecha"></p>
					</div>
					<div id="slogan">
						Préstamos UAZ
					</div>		
			<!-- fin del header -->	
			</div>

			<nav class="navbar navbar-default">
				<div class="contrainer-fluid">
				<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#mymenu">
					<span class="icon-bar"></span>
                    <span class="icon-bar"></span>
				</button>
				</div>
					
				<div class="collapse navbar-collapse" id="mymenu">
					<ul class="nav  navbar-nav">
						<li><a href="#/inicio">Inicio</a></li>
						<li><a href="#/prestamos">Prestamos</a></li>
						<li><a href="#/prestamo">Realizar Prestamo</a></li>
						<li><a href="#/inventario">Inventario</a></li>
						<li><a href="#/allist">Alumnos</a></li>
						<li><a href="#/logout">Cerrar Sesión</a></li>				
					</ul>                    
				</div>
				</div>
			<!-- end of div nav -->
			</nav>
			<div ng-view="" class= "col-md-12" id="ng-view">
				
			</div>

			<div class="footer">
				<span class="copyrightText">©Todos los derechos reservados</span>
				<br />
				<span class="footer_text">
				RAGASI S.A. DE C.V.-  De no existir previa autorización, queda expresamente prohibida la utilización y reproduccion,<br /> total o parcial y cualquier otro uso de los contenidos de este portal</span>		
			<!-- fin del pie de página -->
			</div>
		<!-- fin row-fluid -->
		</div>		
	<!-- fin del contenedor principal container -->
	</div>
</body>
</html>