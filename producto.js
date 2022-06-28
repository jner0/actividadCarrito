class Producto{
    constructor(...info){
        this.sku = info[0];
        this.title = info[1];
        this.price = Number(info[2]);
        this.quantity = Number(info[3]);
    }

    //metodos para retornar valores por pantalla
    getSku(){
        return this.sku;
    }

    getTitle(){
        return this.title;
    }

    getPrice(){
        return this.price;
    }
    
    getQuantity(){
        return this.quantity;
    }
    
}