'useStrict';
import Carrito from './Carrito.js';
const instanciaCarrito = new Carrito();
console.log(instanciaCarrito);
console.log('Script de carrito cargado correctamente');
const responseAPI= 
{
    "currency": "€",
    "products": [
      {
        "SKU": "0K3QOSOV4V",
        "title": "iFhone 13 Pro",
        "price": "938.99"
      },
      {
        "SKU": "TGD5XORY1L",
        "title": "Cargador",
        "price": "49.99"
      },
      {
        "SKU": "IOKW9BQ9F3",
        "title": "Funda de piel",
        "price": "79.99"
      },
      {
        "SKU": "IOKW9BQ9F4",
        "title": "Funda de piel roja",
        "price": "79.99"
      },
      {
        "SKU": "IOKW9BQ9F5",
        "title": "Funda de piel azul",
        "price": "79.99"
      },
      {
        "SKU": "IOKW9BQ9F6",
        "title": "Funda de piel verde",
        "price": "79.99"
      }
      ,
      {
        "SKU": "IOKW9BQ9F7",
        "title": "Funda de piel amarilla",
        "price": "79.99"
      }
    ]
  };

const currency = responseAPI.currency;
const products = responseAPI.products;
instanciaCarrito.setCurrency(currency);

  // creamos esta funicón por si necesitamosbuscar información en la respuesta de la api, en el listado de productos, mediante el sku (id)

function findSKU(SKU) {
  return products.find(product => product.SKU === SKU);
}
  
// creamos esta función para el pintado del 'grid'? 'listado de productos', según lo obtenido de la llamada API

function renderCartItemsPrevious(products, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = ''; // limpiar previo

  products.forEach(product => {
    const article = document.createElement('article');
    article.className = 'cartItem';

    article.innerHTML = `
      <div class="cartItemInfo">
        <h2 class="cartItemTitle">${product.title}</h2>
        <p class="cartItemRef">Ref: ${product.SKU}</p>
      </div>

      <div class="cartItemQty">
        <button class="cartItemBtn cartItemBtnMinus">-</button>
        <span class="cartItemCount">0</span>
        <button class="cartItemBtn cartItemBtnPlus">+</button>
      </div>

      <div class="cartItemUnitPrice">${product.price}€</div>
      <div class="cartItemTotal">0 €</div>
    `;

    container.appendChild(article);
  });
}
/**
 * Función para crear el listado, pero usando createElement y appenChild,
 * e implementando los data-atributes para la funcionallidad de los botones
 * @param {*} products 
 * @param {*} containerSelector 
 * @returns 
 */
function renderCartItems(products, containerSelector) {
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

renderCartItems(products, '.productsList');


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
function attachCartButtonHandlers(container, instanciaCarrito) {
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
    
    // ✅ NUEVA LÓGICA: Deshabilitar botón minus cuando qty=0
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
    
    // Actualizar Carrito
    const producto = { SKU, title, price, qty: newQty };
    if (instanciaCarrito && typeof instanciaCarrito.addProductos === 'function') {
      instanciaCarrito.addProductos(producto);
    }

    console.log (instanciaCarrito);
    console.log (instanciaCarrito.getTotal());

    //pintamos el carrito
    pintarCarrito(instanciaCarrito);
  });
}

const container = document.querySelector('.productsList');
attachCartButtonHandlers(container, instanciaCarrito);
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
    
    // VALIDAR que productos existe y es array
    if (!instanciaCarrito.productos || !Array.isArray(instanciaCarrito.productos)) {
        console.log('No hay productos:', instanciaCarrito.productos);
        summaryTotalValue.textContent = '0.00'+' '+instanciaCarrito.currency;
        
        return;
    }
    
    instanciaCarrito.productos.forEach(producto => {
        // VALIDAR que producto tiene nombre y precio
        if (!producto || !producto.title || typeof producto.price !== 'number') {
            console.log('Producto inválido:', producto);
            return; // Salta este producto
        }
        
        const li = document.createElement('li');
        li.className = 'summaryRow';
        
        const spanLabel = document.createElement('span');
        spanLabel.className = 'summaryLabel';
        spanLabel.textContent = producto.title;
        
        const spanValue = document.createElement('span');
        spanValue.className = 'summaryValue';
        spanValue.textContent = `${producto.price.toFixed(2)}€`;
        
        li.appendChild(spanLabel);
        li.appendChild(spanValue);
        summaryList.appendChild(li);
        total = instanciaCarrito.getTotal();
    });
    total = instanciaCarrito.getTotal();
    summaryTotalValue.innerHTML = total +' ' +instanciaCarrito.currency;
}


