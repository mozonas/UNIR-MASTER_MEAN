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
            // ✅ UPDATE: Actualizar cantidad si existe
            this.productos[existingIndex].qty = producto.qty;
        } else {
            // ✅ CREATE: Nuevo producto usando DATOS DEL BOTÓN
            this.productos.push({
                SKU: producto.SKU,
                title: producto.title,
                price: parseFloat(producto.price),
                qty: producto.qty
            });

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
            // ✅ Formatear ANTES de sumar
            const price = parseFloat(product.price).toFixed(2);
            const itemTotal = parseFloat(price) * product.qty;
            return total + itemTotal;
        }, 0).toFixed(2);
    }
}

export default Carrito;
