class Carrito {
    constructor(productos = []){
        this.productos = productos;
    }

    //metodo para guardar productod
    guardarProducto(producto){
        this.productos.push(producto);
    }
    
    //funcion para obtener productos que ya estan en el Array

    getProductos(){
        return this.productos;
    }

    // Actualiza el número de unidades que se quieren comprar de un producto con +

   
    actualizarUnidades(sku,cantidad) {
        
        this.productos.filter(producto => { 
            
            if  (producto.getSku()===sku) {
                return producto.quantity=cantidad;
              }
        });
    }
    

    obtenerInformacionProducto(sku) {
        return this.productos.filter(producto => {
          if  (producto.getSku()===sku) {
            return producto;
          }
        });
      }

    //obtener carrito
    obtenerCarrito(){
        return this.productos.filter(producto =>{
            if  (producto.getQuantity() >0) {
                return producto;
            }
        });
    }

    //obtener informacion producto

    CalculoTotalCarrito() {
        return this.productos.reduce((acc, producto) => {
            console.log(acc);
            return acc += (producto.getPrice()*(producto.getQuantity()));
            
          }, 0);
    }
  
}