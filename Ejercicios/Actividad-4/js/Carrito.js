'useStrict';
class Carrito{
    Constructor(){
        console.log('Se ha importado la clase Carrito');
        let productos=[];
        let currency='';
    }
    
    addProductos(producto){
        this.productos.push(producto);
    }
    setCurrency(currency){
        this.currency=currency;
    }
}

export default Carrito;