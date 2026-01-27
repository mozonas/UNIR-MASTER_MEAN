'use strict';

class Carrito {
    #productos = [];// creo el atributo productos privado para que no se pueda modificar externamente
    #productosAPI =[]; //creo el atributo privado para que no sea accesible desde fuera, sólo con fuciones
    currency = '';
    #total = 0;// no se si es necesario, no la uso, uso una función que me da el total, igual al pasar a la página siguiente sí que haría falta, no lo sé, me falta contexto

    constructor(productosAPI){
        this.#productosAPI =productosAPI;
    }
    /**
     * Busca si existe en CARRITO (this.productos)
     */
    /**
     * Función para buscar el producto del corructo mediante el sku
     * @param {*} SKU 
     * @returns 
     */
    findProductBySKU(SKU) {
        return this.#productos.find(product => product.SKU === SKU);
    }
    /**
     * Función para buscar la información del producto en la respuesta d ela api
     * @param {*} SKU 
     * @returns 
     */
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

    /**
     * Función para añadir EL PRODUCTO al listado de productos del carrito, no a los productos de la api
     * @param {*} param0 
     * @returns 
     */
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


    /**
     * Función para ELIMINAR UN PRODUCTO del listado de productos del carrito
     * @param {*} SKU 
     */
    removeProductos(SKU) {
        // Buscar índice del producto por SKU
        const index = this.#productos.findIndex(producto => producto.SKU === SKU);
        
        if (index !== -1) {
            // Eliminar producto del array
            this.#productos.splice(index, 1);
        }
    }

    /**
     * Función que devuelve todos los productos del carrito
     * @returns 
     */
    getProductos(){
        return this.#productos;
    }

    /**
     * Función para setear? el valor del currency/moneda
     * @param {*} currency 
     */
    setCurrency(currency) {
        this.currency = currency;
    }

    /**
     * Función para obtener el total
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
