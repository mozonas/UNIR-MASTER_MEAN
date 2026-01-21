'use strict';

class Carrito {
    constructor() {
        this.productos = [];
        this.currency = '';
        this.total = 0;
    }

    /**
     * Busca si existe en CARRITO (this.productos)
     */
    findProductBySKU(SKU) {
        return this.productos.find(product => product.SKU === SKU);
    }

    /**
     * Añade o actualiza producto EN EL CARRITO
     */
    addProductos(producto) {
        const existingIndex = this.productos.findIndex(p => p.SKU === producto.SKU);
        
        if (existingIndex !== -1) {

            this.productos[existingIndex].qty = producto.qty;
            this.productos[existingIndex].subTotal = producto.subTotal;
        } else {

            this.productos.push({
                SKU: producto.SKU,
                title: producto.title,
                price: parseFloat(producto.price),
                subTotal: parseFloat(producto.subTotal),
                qty: producto.qty
            });

        }
    }
    removeProductos(SKU) {
        // Buscar índice del producto por SKU
        const index = this.productos.findIndex(producto => producto.SKU === SKU);
        
        if (index !== -1) {
            // Eliminar producto del array
            this.productos.splice(index, 1);
        }
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
        return this.productos.reduce((total, product) => {
            const price = parseFloat(product.price).toFixed(2);
            const itemTotal = parseFloat(product.subTotal);
            return total + itemTotal;
        }, 0).toFixed(2);
    }
}

export default Carrito;
