'use strict';


var shop = angular.module('ng-Shop', []);

//nuestra factoria se llamará $shop, inyectamos $rootScope
//devuleve un objeto con toda la funcionalidad que debe tener un carrito
shop.factory('$shop', ['$rootScope', function ($rootScope)
{
  /**
  * @var array con el contenido del carrito
  */
  $rootScope.udpShopContent = [],
  
  /**
  * @var integer con el número de artículos del carrito
  */
  $rootScope.udpShopTotalProducts = 0;

  return{
    /**
    * @desc - comprueba los campos que introducimos al añadir productos
    */
    minimRequeriments: function(product)
    {
      if(!product.qty || !product.id)
      {
        throw new Error("Los campos qty, price y id son necesarios");
      }
      if(isNaN(product.qty)  || isNaN(product.id))
      {
        throw new Error("Los campos qty y id deben ser númericos");
      }
      if(product.qty <= 0)
      {
        throw new Error("La cantidad añadida debe ser mayor de 0");
      }
      if(this.isInteger(product.qty) === false)
      {
        throw new Error("La cantidad del producto debe ser un número entero");
      }
    },
    /**
    * @desc - comprueba si el número pasado es un entero
    * @return - bool
    */
    isInteger: function(n) 
    {
        if(n % 1 === 0)
          return true;
        else
          return false;
    },
    /**
    * @desc - añade nuevos productos al carrito
    * @param - array con los datos del producto
    * @return - mixed
    */
    add: function(producto)
    {
      try{
        //comprobamos si el producto cumple los requisitos
        this.minimRequeriments(producto);

        //si el producto existe le actualizamos la cantidad
        if(this.checkExistsProduct(producto,$rootScope.udpShopContent) === true)
        {
          
          $rootScope.udpShopTotalProducts += producto.qty;
          return {"msg":"updated"};
        }
        //en otro caso, lo añadimos al carrito
        else
        {
          
          $rootScope.udpShopTotalProducts += producto.qty;
          $rootScope.udpShopContent.push(producto);
          return {"msg":"insert"};
        }
      }
      catch(error)
      {
        alert("Error " + error);
      }
    },
    /**
    * @desc - comprueba si el producto existe en el carrito
    * @param - product - objecto con los datos del producto a añadir
    * @param - products - array con el contenido del carrito
    * @return - bool
    */
    checkExistsProduct: function(product, products) 
    {
        var i, len;
        for (i = 0, len = products.length; i < len; i++) 
        {
            if (products[i].id === product.id) 
            {     
              products[i].qty += product.qty;  
                return true;
            }
        }
        return false;
    },
    /**
    * @desc -elimina un producto completo por su id
    * @param - int - id del producto
    * @return - mixed
    */
    remove: function(id)
    {
      try{
        var i, len;
        for (i = 0, len = $rootScope.udpShopContent.length; i < len; i++) 
          {
              if ($rootScope.udpShopContent[i].id === id) 
              {
                $rootScope.udpShopTotalProducts -= $rootScope.udpShopContent[i].qty;
                $rootScope.udpShopContent.splice(i, 1);
                
                return {"msg":"deleted"};
              }
          }
      }
      catch(error)
      {
        alert("Error " + error);
      }
    },
    /**
    * @desc - elimina todo el contenido del carrito, precio total y productos
    * @return - bool
    */
    destroy: function()
    {
      try{
        $rootScope.udpShopContent = [];
        $rootScope.udpShopTotalProducts = 0;
      }
      catch(error)
      {
        alert("Error " + error);
      }
    },
    
  };
}]);