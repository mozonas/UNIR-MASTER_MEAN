'useStrict';
import Carrito from './Carrito.js';

const container = document.querySelector('.productsList');
//https://jsonblob.com/019bea66-482d-76ff-9a09-7e8e6419f86b

const url= 'https://api.jsonblob.com/019bea66-482d-76ff-9a09-7e8e6419f86b';

//Implementar lógica de la llamada rest api
const  promesa_peticion  = fetch( url );

promesa_peticion.then( ( respuesta )=>{
// Cuando va bien 
    if( respuesta.status === 200 ){
        respuesta.json().then( (data)=>{
          const responseAPI= data;
          const currency = responseAPI.currency;
          const products = responseAPI.products;
          const instanciaCarrito = new Carrito(products);
          instanciaCarrito.setCurrency(currency);
          renderApiItems(products, '.productsList');
          attachCartButtonHandlers(container, instanciaCarrito);
        } ).catch( (error)=>{
            console.log(error)
        } )


    }

}).catch( (error)=>{
// ERROR
    console.log("error")
    console.log(error)
} );

// Uso


// creamos esta función por si necesitamosbuscar información en la respuesta de la api, en el listado de productos, mediante el sku (id)

function findSKU(SKU) {
  return products.find(product => product.SKU === SKU);
}
  
// creamos esta función para el pintado del 'grid'? 'listado de productos', según lo obtenido de la llamada API
/**
 * Función para crear el listado, pero usando createElement y appenChild,
 * e implementando los data-atributes para la funcionallidad de los botones
 * @param {*} products 
 * @param {*} containerSelector 
 * @returns 
 */
function renderApiItems(products, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const fragment = document.createDocumentFragment();

  products.forEach(product => {
    // article principal
    const article = document.createElement('article');
    article.className = 'cartItem';

    // cartItemInfo
    const infoDiv = document.createElement('div');
    infoDiv.className = 'cartItemInfo';
    
    const title = document.createElement('h2');
    title.className = 'cartItemTitle';
    title.textContent = product.title;
    
    const ref = document.createElement('p');
    ref.className = 'cartItemRef';
    ref.textContent = `Ref: ${product.SKU}`;
    
    infoDiv.appendChild(title);
    infoDiv.appendChild(ref);

    // cartItemQty
    const qtyDiv = document.createElement('div');
    qtyDiv.className = 'cartItemQty';
    
    const btnMinus = document.createElement('button');
    btnMinus.className = 'cartItemBtn cartItemBtnMinus';
    btnMinus.textContent = '-';
    // Data attributes en botones
    btnMinus.dataset.sku = product.SKU;
    btnMinus.dataset.price = product.price;
    btnMinus.dataset.title = product.title;
    btnMinus.dataset.qty = '0';
    
    const count = document.createElement('span');
    count.className = 'cartItemCount';
    count.textContent = '0';
    
    const btnPlus = document.createElement('button');
    btnPlus.className = 'cartItemBtn cartItemBtnPlus';
    btnPlus.textContent = '+';
    // Data attributes en botones
    btnPlus.dataset.sku = product.SKU;
    btnPlus.dataset.price = product.price;
    btnPlus.dataset.subTotal = '0';
    btnPlus.dataset.title = product.title;
    btnPlus.dataset.qty = '0';
    
    qtyDiv.appendChild(btnMinus);
    qtyDiv.appendChild(count);
    qtyDiv.appendChild(btnPlus);

    // precios
    const unitPrice = document.createElement('div');
    unitPrice.className = 'cartItemUnitPrice';
    unitPrice.textContent = `${product.price}€`;

    const total = document.createElement('div');
    total.className = 'cartItemTotal';
    total.textContent = '0 €';

    // ensamblar article
    article.appendChild(infoDiv);
    article.appendChild(qtyDiv);
    article.appendChild(unitPrice);
    article.appendChild(total);
    
    fragment.appendChild(article);
  });

  container.innerHTML = '';
  container.appendChild(fragment);
}


// renderizamos el listado de productos

//renderCartItems(products, '.productsList');


/** implementamos la lógica de los botones
* para implemetar la lógica de los botones,nos basaremos enla clase cartItemBtn
* toda esta lista de botoenes tiene la misma funcionalidad, en principio:
* - actualizar la cantidad en <span class="cartItemCount">0</span>
* - actualizar la cantidad en los dos botones, en cartItemBtnPlus y en cartItemBtnMinus del div padre, no del resto
* - realizar el cálculo qty*price y actualizar cartItemTotal que está en el div padre
* - hacer una llamáda al método de la Clase Carrito -> addProductos(producto){
        this.productos.push(producto);
    }
* que tendremos que modificar para que haga una búsqueda anterior por sku para ver si existe, si existe, se hace un update, sino, se hace el push
*/
function attachCartButtonHandlersPrevious(container, instanciaCarrito) {
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.cartItemBtn');
    if (!btn) return;

    e.preventDefault();
    
    // Elementos del div padre (article)
    const article = btn.closest('.cartItem');
    const count = article.querySelector('.cartItemCount');
    const total = article.querySelector('.cartItemTotal');
    
    // Datos del botón
    const SKU = btn.dataset.sku;
    const price = parseFloat(btn.dataset.price);
    const title = btn.dataset.title;
    //según lo comentado en clase, la cantidad debe de leerse del carrito
    const currentQty = parseInt(btn.dataset.qty) || 0;
    
    // Detectar + o - por segunda clase
    let newQty;
    if (btn.classList.contains('cartItemBtnPlus')) {
      newQty = currentQty + 1;
    } else if (btn.classList.contains('cartItemBtnMinus')) {
      newQty = Math.max(0, currentQty - 1);
    }
    
    // Actualizar UI
    count.textContent = newQty;
    
    // Sincronizar data-qty en AMBOS botones del mismo artículo
    const bothButtons = article.querySelectorAll('.cartItemBtn');
    bothButtons.forEach(b => b.dataset.qty = newQty);
    bothButtons.forEach(b => b.dataset.subTotal = newQty*price);
    
    // NUEVA LÓGICA: Deshabilitar botón minus cuando qty=0
    const btnMinus = article.querySelector('.cartItemBtnMinus');
    if (newQty === 0) {
      btnMinus.classList.add('disabled');  // Añadir clase CSS
      btnMinus.disabled = true;            // Deshabilitar nativo
    } else {
      btnMinus.classList.remove('disabled'); // Quitar clase CSS
      btnMinus.disabled = false;             // Habilitar nativo
    }

    // Actualizar total
    total.textContent = `${(newQty * price).toFixed(2)} €`;
    
    // Actualizar Carrito (SIEMPRE actualiza o elimina)
    let subtotal= price*newQty;
    const producto = { 
    SKU, 
    title, 
    price,
    subTotal : subtotal,  // ← subtotal
    qty: newQty 
};
    if (newQty > 0) {
      // Actualizar/Añadir con nueva cantidad
      if (instanciaCarrito && typeof instanciaCarrito.addProductos === 'function') {
        instanciaCarrito.addProductos(producto);
      }
    } else {
      // qty = 0 → ELIMINAR producto
      if (instanciaCarrito && typeof instanciaCarrito.removeProductos === 'function') {
        instanciaCarrito.removeProductos(SKU);
      }
    }


    console.log (instanciaCarrito);
    console.log (instanciaCarrito.getTotal());

    //pintamos el carrito
    pintarCarrito(instanciaCarrito);
  });
}

//24012026 nueva función attachCartButtonHandlers
/**
 * 
 * @param {*} container 
 * @param {*} instanciaCarrito 
 */
function attachCartButtonHandlers(container, instanciaCarrito) {
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.cartItemBtn');
    if (!btn) return;

    const SKU = btn.dataset.sku;
    const article = btn.closest('.cartItem');
    const isPlus = btn.classList.contains('cartItemBtnPlus');
    
    console.log('SKU:', SKU, 'isPlus:', isPlus);
    
    const productoCarrito = instanciaCarrito.findProductBySKU(SKU);
    const currentQty = productoCarrito ? productoCarrito.qty : 0;
    const newQty = isPlus ? currentQty + 1 : Math.max(0, currentQty - 1);
    
    console.log('currentQty:', currentQty, 'newQty:', newQty);
    
    if (newQty > 0) {
      instanciaCarrito.addProductos({ SKU, qty: newQty });
    } else {
      instanciaCarrito.removeProductos(SKU);
    }
    
    updateArticleUI(article, SKU, instanciaCarrito);
    pintarCarrito(instanciaCarrito);
  });
}

function updateArticleUI(article, SKU, instanciaCarrito) {
  
  const productoCarrito = instanciaCarrito.findProductBySKU(SKU);
  console.log('Producto en carrito:', productoCarrito);  // ← 7
  const count = article.querySelector('.cartItemCount');
  const total = article.querySelector('.cartItemTotal');
  const btnMinus = article.querySelector('.cartItemBtnMinus');
  
  // LEER DEL CARRITO (no DOM)

  const productoAPI = instanciaCarrito.findApiProductBySKU(SKU);
  
  const qty = productoCarrito ? productoCarrito.qty : 0;
  const price = productoAPI ? parseFloat(productoAPI.price) : 0;
  
  // ACTUALIZAR DOM
  count.textContent = qty;                          
  total.textContent = `${(qty * price).toFixed(2)} €`;
  
  // DATA-QTY EN BOTONES
  const bothButtons = article.querySelectorAll('.cartItemBtn');
  bothButtons.forEach(btn => {
    btn.dataset.qty = qty;
  });
  
  // BOTÓN MINUS
  if (qty === 0) {
    btnMinus.disabled = true;
    btnMinus.classList.add('disabled');
  } else {
    btnMinus.disabled = false;
    btnMinus.classList.remove('disabled');
  }
}


// implementamos la lógica del renderizado de carrito

/**
 * 
 * @param {*} instanciaCarrito 
 * @returns 
 */

function pintarCarrito(instanciaCarrito) {
    const summaryList = document.querySelector('.summaryList');
    const summaryTotalValue = document.querySelector('.summaryTotalValue');
    
    summaryList.innerHTML = '';
    let total = 0;
    const productos= instanciaCarrito.getProductos();
    if (!productos || !Array.isArray(productos)) {
        summaryTotalValue.textContent = `0.00 ${instanciaCarrito.currency}`;
        return;
    }
    
productos.forEach(producto => {
    // VALIDAR subTotal (precio * qty)
    if (!producto || !producto.title || typeof producto.subTotal !== 'number') {
        return;
    }
    
    const li = document.createElement('li');
    li.className = 'summaryRow';
    
    const spanLabel = document.createElement('span');
    spanLabel.className = 'summaryLabel';
    spanLabel.textContent = producto.title;
    
    const spanValue = document.createElement('span');
    spanValue.className = 'summaryValue';
    spanValue.textContent = `${producto.subTotal.toFixed(2)}€`;
    
    li.appendChild(spanLabel);
    li.appendChild(spanValue);
    summaryList.appendChild(li);
    
    total += producto.subTotal;
  });

  summaryTotalValue.textContent = `${total.toFixed(2)} ${instanciaCarrito.currency}`;
}


