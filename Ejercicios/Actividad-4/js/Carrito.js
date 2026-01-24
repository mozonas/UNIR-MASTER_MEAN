'use strict';

class Carrito {
    #productos = [];// creo el atributo productos privado para que no se pueda modificar externamente
    #productosAPI =[]; //creo el atributo privado para que no sea accesible desde fuera, sólo con fuciones
    currency = '';
    #total = 0;

    constructor(productosAPI){
        this.#productosAPI =productosAPI;
    }
    /**
     * Busca si existe en CARRITO (this.productos)
     */
    findProductBySKU(SKU) {
        return this.#productos.find(product => product.SKU === SKU);
    }

    findApiProductBySKU(SKU) {
        return this.#productosAPI.find(productAPI => productAPI.SKU === SKU);
    }
    /**
     * Añade o actualiza producto EN EL CARRITO
     */
    oldAddProductosPorProductoParam(producto) {
        const existingIndex = this.#productos.findIndex(p => p.SKU === producto.SKU);
        
        if (existingIndex !== -1) {

            this.#productos[existingIndex].qty = producto.qty;
            this.#productos[existingIndex].subTotal = producto.subTotal;
        } else {

            this.#productos.push({
                SKU: producto.SKU,
                title: producto.title,
                price: parseFloat(producto.price),
                subTotal: parseFloat(producto.subTotal),
                qty: producto.qty
            });

        }
    }

    addProductos({ SKU, qty }) {
        const productoAPI = this.findApiProductBySKU(SKU);
        if (!productoAPI) return;
        
        const producto = {
            SKU,
            title: productoAPI.title,
            price: parseFloat(productoAPI.price),
            qty: qty,  // ← qty EXACTA, no +1
            subTotal: parseFloat(productoAPI.price) * qty
        };
        
        const existingIndex = this.#productos.findIndex(p => p.SKU === SKU);
        if (existingIndex !== -1) {
            this.#productos[existingIndex] = producto;
        } else {
            this.#productos.push(producto);
        }
    }



    removeProductos(SKU) {
        // Buscar índice del producto por SKU
        const index = this.#productos.findIndex(producto => producto.SKU === SKU);
        
        if (index !== -1) {
            // Eliminar producto del array
            this.#productos.splice(index, 1);
        }
    }
    getProductos(){
        return this.#productos;
    }
    /**
     * 
     * @param {*} currency 
     */
    setCurrency(currency) {
        this.currency = currency;
    }
    /**
     * 
     * @returns 
     */
    getTotal() {
        /*
        return this.#productos.reduce((total, product) => {
            const price = parseFloat(product.price).toFixed(2);
            const itemTotal = parseFloat(product.subTotal);
            return total + itemTotal;
        }, 0).toFixed(2);
        */

        return this.#productos.reduce((total, product) => {
            return total + parseFloat(product.subTotal || 0);
        }, 0).toFixed(2);
    }
}

export default Carrito;
