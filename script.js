function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

const getPriceNameId = (item) => {
  console.log(item.querySelector(('span.item__sku').innerText));
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const buscarDadosProduto = async (id) => {
  const ol = document.querySelector('.cart__items');
  const data = await fetchItem(id);
  const li = createCartItemElement(data);
  console.log(ol);
  ol.appendChild(li);
};

const addListennerOnButtons = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((buton) => buton.addEventListener('click', ({ target }) => {
    const item = target.parentNode;
    const id = getSkuFromProductItem(item);
    buscarDadosProduto(id);
  }));
};

function createProductItemElement({ id: sku, title: name, thumbnail: image, price }) {
  const section = document.createElement('section');
  section.className = 'item';
  const items = document.querySelector('.items');

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', price));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  items.appendChild(section);
}

const buscarDados = async () => {
  const data = await fetchProducts();
  data.results.forEach(createProductItemElement);
};
  
window.onload = async () => {
  await buscarDados();
  addListennerOnButtons();
};
