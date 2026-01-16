'useStrict';
import Carrito from './Carrito.js';
const instanciaCarrito = new Carrito();
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
  
  function findSKU(SKU) {
    return products.find(product => product.SKU === SKU);
  }

  function renderCartItems(products, containerSelector) {
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

// uso
renderCartItems(products, '.productsList');
