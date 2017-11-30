var myApp = angular.module("myApp",['ngRoute', 'ng-Shop','angularUtils.directives.dirPagination']);

myApp.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};
    obj.getArticulos = function(){
        return $http.get(serviceBase + 'articulos');
    }

    obj.getArticulosPrestamos = function(prestamoID){
        return $http.get(serviceBase + 'articulosPrestamo?id='+prestamoID);
    }

   

	obj.getAlumno = function(alumnoID){
        return $http.get(serviceBase + 'alumno?id=' + alumnoID);
    }

    obj.valAlumno = function(alumnoID){
        return $http.get(serviceBase + 'valalum?id=' + alumnoID);
    }

    obj.getPrestamo = function(prestamoID){
        return $http.get(serviceBase + 'prestamo?id=' + prestamoID);
    }

	obj.getAlumnos = function(){
        return $http.get(serviceBase + 'alumnos');
    }

	obj.getPrestamos = function(){
        return $http.get(serviceBase + 'prestamos');
    }    

    obj.insertAlumno = function (alumno) {
    return $http.post(serviceBase + 'insertAlumno', alumno).then(function (results) {
        return results;
    });
	};

	obj.insertPrestamo = function (prestamo) {
    return $http.post(serviceBase + 'insertPrestamo', prestamo).then(function (results) {
        return results;
    });
	};

	obj.crearLista = function (articulo) {
    return $http.post(serviceBase + 'crearLista', articulo).then(function (results) {
        return results;
    });
	};

	obj.updateAlumno = function (id,alumno) {
	    return $http.post(serviceBase + 'updateAlumno', {id:id, alumno:alumno}).then(function (status) {
	        return status.data;
	    });
	};

	obj.updatePrestamo = function (id,prestamo) {
	    return $http.post(serviceBase + 'updatePrestamo',{id:id,prestamo:prestamo}).then(function (status) {
	        return status.data;
	    });
	};


	obj.deleteAlumno = function (id) {
	    return $http.delete(serviceBase + 'deleteAlumno?id=' + id).then(function (status) {
	        return status.data;
	    });
	};

    return obj;   
}]);




myApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.when("/",{
		title:"inicio",
		templateUrl: "partials/prestamoslist.html",
		controller: "prestamosCtrl"
	})

	.when("/inicio",{
		templateUrl: "partials/prestamoslist.html",
		controller: "prestamosCtrl"
	})

	.when("/prestamos",{
		templateUrl: "partials/prestamoslist.html",
		controller: "prestamosCtrl"
	})

	.when("/inventario",{
		templateUrl: "partials/inventario.html",
		controller: "listCtrl"
	})

	.when("/add",{
		templateUrl: "partials/addalumnos.html",
		controller: "addAlCtrl"
		
	})

  .when("/logout",{
    templateUrl: "partials/logout.php",
    controller: "logoutCtrl"
    
  })

	.when("/prestamo",{
		templateUrl: "partials/prestamos.html",
		controller: "listCtrl"
	})

	.when("/allist",{
		templateUrl: "partials/alumnosall.html",
		controller: "listAlCtrl"
	})

	.when("/editaralumno/:alumnoID",{
		title:'Editar Alumno',
		templateUrl: "partials/editalumno.html",
		controller: "alumnoController",
		resolve: {
          alumno: function(services, $route){
            var alumnoID = $route.current.params.alumnoID;
           
            return services.getAlumno(alumnoID);
            
          }


        }
		
	})

	.when("/detallesPrestamo/:prestamoID",{
		title:'Editar Alumno',
		templateUrl: "partials/detallesprestamo.html",
		controller: "detallesController",
		resolve: {
          prestamo: function(services, $route){
            var prestamoID = $route.current.params.prestamoID;
            
            return services.getPrestamo(prestamoID);
            
          }


        }
		
	})


	.otherwise({
		redirector: "/"
	});


}]);//fin de myApp.config

myApp.controller('alumnoController', function ($scope,$route,$rootScope,$templateCache, $location, $routeParams, services, alumno) {
    var alumnoID = parseInt($routeParams.alumnoID) ? parseInt($routeParams.alumnoID) : 0;
    
      var original = alumno.data;
      original._id = alumnoID;
      if(original.alumno_carrera=="IC"){
      		original.alumno_carrera="Ing. en Computación";
      	}
      	else if(original.alumno_carrera=="ICE"){
      		original.alumno_carrera="Ing. en Comunicaciones y Electrónica";
      	}
      	else if(original.alumno_carrera=="PSI"){
      		original.alumno_carrera="Psicología";
      	}
      	else if(original.alumno_carrera=="ENF"){
      		original.alumno_carrera="Enfermería";
      	}
      $scope.alumno = angular.copy(original);

      
      $scope.alumno._id = alumnoID;

      

      $scope.isClean = function() {
        return angular.equals(original, $scope.alumno);
      }

     

      $scope.saveAlumno = function(alumno) {
        $location.path('/');
        if(alumno.alumno_carrera=="Ing. en Computación"){
      		alumno.alumno_carrera="IC";
      	}
      	else if(alumno.alumno_carrera=="Ing. en Comunicaciones y Electrónica"){
      		alumno.alumno_carrera="ICE";
      	}
      	else if(alumno.alumno_carrera=="Psicología"){
      		alumno.alumno_carrera="PSI";
      	}
      	else if(alumno.alumno_carrera=="Enfermería"){
      		alumno.alumno_carrera="ENF";
      	}
        services.updateAlumno(alumnoID, alumno);
        $templateCache.removeAll();
        $location.path('/allist');
	    $route.reload();
        
    };
});

function homeCtrl($scope){
  $scope.currentPage =1;
  $scope.pageSize = 5;
  $scope.pageChangeHandler = function(num){

  };
}

function OtherCtrl($scope){
  $scope.pageChangeHandler = function(num){
    console.log('going to page'+num);
  };
}

myApp.controller('detallesController', function ($scope,$route,$rootScope,$templateCache, $location, $routeParams, services, prestamo) {
    var prestamoID = parseInt($routeParams.prestamoID) ? parseInt($routeParams.prestamoID) : 0;
    
      var original = prestamo.data;
      original._id = prestamoID;

    services.getAlumno(original.alumno_matricula).then(function(data){
			var alum = data.data;
			var nombre = alum.alumno_nombre+" "+alum.alumno_apellidop+" "+ alum.alumno_apellidom;
			$scope.nomAl = nombre;

			if(alum.alumno_carrera=="IC"){
      		$scope.carAl="Ing. en Computación";
	      	}
	      	else if(alum.alumno_carrera=="ICE"){
	      		$scope.carAl="Ing. en Comunicaciones y Electrónica";
	      	}
	      	else if(alum.alumno_carrera=="PSI"){
	      		$scope.carAl="Psicología";
	      	}
	      	else if(alum.alumno_carrera=="ENF"){
	      		$scope.carAl="Enfermería";
	      	}
	});

	services.getArticulosPrestamos(prestamoID).then(function(data){
        	var art= data.data;
        	
        	$scope.articulos =art;
        	if(data==''){
        		alert("no hay articuos");
        	}
    	});
      
      $scope.prestamo = angular.copy(original);

      
      $scope.prestamo._id = prestamoID;
      
});


myApp.controller("logoutCtrl", function($scope, services, $route){
  
  window.location="/inicial.php"; 

});

myApp.controller('listCtrl', function ($scope, $shop,$route,$rootScope, $location, $routeParams, services) {
    var filtro ="";
    services.getArticulos().then(function(data){
        	$scope.articulos = data.data;
    	});

    //var art=angular.copy(articulos.data);

    $scope.$on('$viewContentLoaded',function(){
      $scope.currentPage=1;
      $scope.pageSize=5;
    });

    $scope.add = function(data)
	{
		
		var product = {};
		product.id = data.articulo_id;
		product.name = data.articulo_nombre;
		product.qty = 1;
		$shop.add(product);
	}

	$scope.verificarStock = function()
	{
		//Verificar stock de articulos para los prestamos
	}

	$scope.addprest = function(udpShopContent){
		
		var al;
		var band = false;
		var idal=$scope.alID;
		$scope.vAl =1;
		services.valAlumno(idal).then(function(data){
        	var existe = data.data;
            if (existe=="1"){
            	var idp = genID();
            	services.getPrestamo(idp).then(function(data){
		        	var ep = data.data;
		            if(ep == "0"){
						realizarPrestamo(udpShopContent,idp);

					}else{
						idp = genID();
					}
		    	});
            	  
            }else{
             	$scope.vAl =0;   
            }
    	});
	}

	function realizarPrestamo(udpShopContent,idp){
		var prestamo={};
		var idal=$scope.alID;
		addLista(udpShopContent,idp);
		prestamo.prestamo_id=idp;
		prestamo.alumno_matricula =idal;
		services.insertPrestamo(prestamo);
		$shop.destroy();
		$location.path('/inicio');
		$route.reload();
	}

	function addLista(udpShopContent,idp){
		var n = udpShopContent.length;
		var articulo={};


		for (var i = 0; i < n; i++) {
			articulo.prestamo_id = idp;
			articulo.linea_unidades = udpShopContent[i].qty;
			articulo.articulo_id = udpShopContent[i].id;
			services.crearLista(articulo);
			
			articulo={};
		}
	}



	//elimina un producto del carrito por su id
	
	$scope.remove = function(id)
	{
		if(confirm("¿Deseas eliminar este producto de la lista?")==true){
			if($shop.remove(id))
			{
				alert("Producto eliminado correctamente.");
				return;
			}
			else
			{
				alert("Ha ocurrido un error.");
				return;
			}
		}
	}
	
	/**
	* @desc - elimina el contenido del carrito
	*/
	$scope.destroy = function()
	{
		$shop.destroy();
	}


	function genID() {
		var prestamoID;
		prestamoID = Math.round(Math.random()*(99999-1)+parseInt(1));
		return prestamoID;
		
    }//Fin de la funcion genID()

    function obtenerAlumno(alumno){       
    	var alum = alumno.data;
    	
    }


});

myApp.controller('listAlCtrl', function ($scope,$route,$templateCache,$location,services) {
   
    $scope.alumnos;

    services.getAlumnos().then(function(data){
        $scope.alumnos = data.data;

    });

    $scope.eliminarAlumno = function(data) {
        if(confirm("¿Desea eliminar alumno? ")==true)
        services.deleteAlumno(data.alumno_matricula);
    	clearCache();
	    $location.path('/allist');
	    $route.reload();
    }

    function clearCache(){
    	$templateCache.removeAll();	
    }
   
$scope.$on('$viewContentLoaded',function(){
  $scope.currentPage=1;
  $scope.pageSize=5;
});

});


myApp.controller('prestamosCtrl', function ($scope,$route,$location,$templateCache,services) {
   
    $scope.prestamos;

    services.getPrestamos().then(function(data){
        $scope.prestamos = data.data;

    });

    $scope.$on('$viewContentLoaded',function(){
      $scope.currentPage=1;
      $scope.pageSize=5;
    });

    $scope.devolver= function(prestamo){
    	var prestamoID = prestamo.prestamo_id;
    	services.updatePrestamo(prestamoID,prestamo);
    	
    	$templateCache.removeAll();
	    $route.reload();
    }


});


myApp.controller('addAlCtrl', function ($scope, $rootScope,$route, $location, $routeParams, services) {
    
      $scope.alumno;
      $scope.sel;
      $scope.estado="";
    $scope.saveAlumno = function(alumno) {
      	if(alumno.alumno_carrera=="Ing. en Computación"){
      		alumno.alumno_carrera="IC";
      		$scope.sel=1;
      	}
      	else if(alumno.alumno_carrera=="Ing. en Comunicaciones y Electrónica"){
      		alumno.alumno_carrera="ICE";
      		$scope.sel=1;
      	}
      	else if(alumno.alumno_carrera=="Psicología"){
      		alumno.alumno_carrera="PSI";
      		$scope.sel=1;
      	}
      	else if(alumno.alumno_carrera=="Enfermería"){
      		alumno.alumno_carrera="ENF";
      		$scope.sel=1;
      	}else if(alumno.alumno_carrera==""){
      		$scope.sel=0;
      	}

      	if($scope.sel==1){
      		services.valAlumno(alumno.alumno_matricula).then(function(data){
        	var existe = data.data;
            if (existe=="1"){
                alert("existe el alumno");
            }else{
             	services.insertAlumno(alumno);
      			$scope.alumno="";	
      			$scope.estado="";   
            }
    	});
      	}
		
	}
 
});


myApp.controller("noticiasController",function($scope,services){
	
});


myApp.run(['$location','$rootScope',function($location,$rootScope){
	$rootScope.$on('$routeChangeSuccess', function (event,current, previous){
		$rootScope.title = current.$$route.tit
	});
}]);

var logeo = angular.module("login",['ngRoute']);

logeo.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};

    obj.login = function(usuario,password){
        return $http.post(serviceBase + 'login',{usuario:usuario,password:password});
    }


    return obj;   
}]);

logeo.controller('loginCtrl', function ($scope, $rootScope,$route, $location, $routeParams, services) {
    
      
    $scope.iniciarSesion = function() {
    	var usu=$scope.usuario;
      $scope.li=1;
      	var cont=$scope.contrasena;
		   
		services.login(usu,cont).then(function(data){
        	var existe = data.data;
        	
            if (existe=='0'){
              $scope.li=0;
            }else{
            	window.location="/inicial.php";  
            }
    	});
	}
 
});




