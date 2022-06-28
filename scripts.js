const carrito = new Carrito();

document.addEventListener('DOMContentLoaded', function(){

    fetch('https://jsonblob.com/api/989354755994435584').then((res) =>{
        return res.json();
    }).then((resjson) =>{
        //llamar metodos
        //console.log(resjson)
        listadoProductos(resjson);
        pintarCarrito(resjson.currency ,carrito.getProductos());

    }).catch((errorjson)=>{
        console.log('errorjson', errorjson);
    })

    //agrego los productos que tengo en el archivo json
    const listadoProductos = (resjson) =>{
        resjson.products.forEach(producto =>{
            const nuevoProducto = new Producto(producto.SKU, producto.title, producto.price, 0);
            carrito.guardarProducto(nuevoProducto);
        });
    }

    //vamos a pintar nuestros productos con la funcion Pintar Carrito
    const pintarCarrito = (currency, productos) =>{
        
        const items = document.getElementById('items');
        items.innerHTML = "";
        
        productos.forEach(producto =>{
            const tr = document.createElement('tr');

      
            
            //creamos td de title 
            const tdtitle = document.createElement('td');
            const title = document.createElement('p');
            title.innerHTML = `${producto.getTitle()}</br>Ref: ${producto.getSku()}`;
            tdtitle.appendChild(title);

            //creamos td para boton de restar cantidad
            const restarButton = document.createElement('button');
            restarButton.innerText = '-';
            restarButton.setAttribute('restar-sku', producto.getSku());
            restarButton.setAttribute('currency', currency);
            restarButton.addEventListener('click', restarCantidadClickHandler);

            restarButton.setAttribute('data-price', producto.getPrice());
            //creamos boton de sumar cantidad
            const sumarButton = document.createElement('button');
            sumarButton.innerText = '+';
            sumarButton.setAttribute('sumar-sku', producto.getSku());
            sumarButton.setAttribute('currency', currency);
            sumarButton.addEventListener('click', sumarCantidadClickHandler);

            sumarButton.setAttribute('data-price', producto.getPrice());
            //creamos espacio de cantidad
            const cantidadInput = document.createElement('input');
            cantidadInput.setAttribute('disabled', '');
            cantidadInput.setAttribute('value', 0);
            cantidadInput.setAttribute('id', producto.getSku());

            //agragamos espacio de cantidad donde va '+ cantidad -'
            const tdcantidad = document.createElement('td');
            tdcantidad.appendChild(restarButton);
            tdcantidad.appendChild(cantidadInput);
            tdcantidad.appendChild(sumarButton);

            //agregamos espacio de valor unitario
            const tdunidad = document.createElement('td');
            const unidad = document.createElement('p');
            unidad.innerHTML = `${producto.getPrice()} ${currency}`;
            tdunidad.appendChild(unidad);

            //agregamos espacio de total
            const tdtotal = document.createElement('td');
            const total = document.createElement('p');
            total.setAttribute('id', "td_" + producto.getSku());
            total.innerHTML = `0 ${currency}`;
            tdtotal.appendChild(total);

            


            //agregamos title a nuestra tabla
            tr.appendChild(tdtitle);
            //agregamos seccion cantidad a nuestra tabla
            tr.appendChild(tdcantidad);
            tr.appendChild(tdunidad);
            items.appendChild(tr);
            tr.appendChild(tdtotal);
        });
    }

    const pintarTotal = (currency) =>{

        const totalEl = document.querySelector('#informacion');
        totalEl.innerText = "";
        
        carrito.obtenerCarrito().forEach(producto =>{
            const tr = document.createElement('tr');

            const nombreProducto = document.createElement('td');
            const detalleProducto = document.createElement('p');
            detalleProducto.innerHTML = producto.getTitle();

            const precioProducto = document.createElement('td');
            const detallePrecio = document.createElement('p');
            detallePrecio.innerHTML = (producto.getPrice()*(producto.getQuantity())).toFixed(2) +" "+ currency;


            nombreProducto.appendChild(detalleProducto);
            precioProducto.appendChild(detallePrecio);
            tr.appendChild(nombreProducto);
            tr.appendChild(precioProducto);

            totalEl.appendChild(tr);
        });

        const totalPagar = document.getElementById('totalPagar');
        const total = carrito.CalculoTotalCarrito();
        totalPagar.innerHTML = total.toFixed(2)+ " " + currency;
        console.log(totalPagar);
    }

    

        //clickhandler para sumar button
        const sumarCantidadClickHandler = (event) =>{
            const sku = event.target.getAttribute('sumar-sku');
            const currency = event.target.getAttribute('currency');
            const inputSku = document.getElementById(sku);
            
            let valorInput = Number(inputSku.value);
            let unidades = valorInput + 1;
            inputSku.value = unidades;
            carrito.actualizarUnidades(sku,unidades);
            const productoActualizado = carrito.obtenerInformacionProducto(sku);
            productoActualizado.forEach (producto => {
                const calcularTotal = document.getElementById("td_" + sku);
                calcularTotal.innerHTML = (producto.getPrice()*(producto.getQuantity())).toFixed(2) +" "+ currency;
            });
            pintarTotal(currency);
        }
        
        //click handler para restar button
        const restarCantidadClickHandler = (event) =>{
            const sku = event.target.getAttribute('restar-sku');
            const currency = event.target.getAttribute('currency');
            const inputSku = document.getElementById(sku);

            let valorInput = Number(inputSku.value);
            let unidades = 0;
            if (valorInput > 0) {
                unidades = valorInput - 1; 
              } 
            inputSku.value = unidades;
            carrito.actualizarUnidades(sku,unidades);
            const productoActualizado = carrito.obtenerInformacionProducto(sku);
            productoActualizado.forEach(producto =>{
                const calcularTotal = document.getElementById("td_" + sku);
                calcularTotal.innerHTML = (producto.getPrice()*(producto.getQuantity())).toFixed(2) +" "+ currency;
            });

            pintarTotal(currency);
        }


});