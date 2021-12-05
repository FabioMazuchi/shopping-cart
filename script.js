const ol = document.querySelector('.cart__items');
const somaSpan = document.querySelector('.total-price');
const esvaziarBtn = document.querySelector('.empty-cart');

const somar = () => {
  const array = ol.children;
  let soma = 0;
  for (let i = 0; i < array.length; i += 1) {
    const pos = array[i].innerText.indexOf('$');
    const res = Number(array[i].innerText.substring(pos + 1));
    soma += res;
  }
  somaSpan.innerText = soma;
};

const esvaziarCarrinho = () => {
  const array = ol.children;

  for (let i = 0; i < array.length; i += i) {
    array[i].remove();  
    console.log(array.length);
  }
  somar();
};

esvaziarBtn.addEventListener('click', esvaziarCarrinho);

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  const array = ol.children;
  const select = event.target;
  select.classList.add('clicou');

  for (let i = 0; i < array.length; i += 1) {
    if (array[i].classList[1] === 'clicou') {
      array[i].remove();
    }  
  }
  somar();
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
  const data = await fetchItem(id);
  const li = createCartItemElement(data);
  ol.appendChild(li);
  saveCartItems(ol.innerHTML);
  somar();
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
  section.appendChild(createCustomElement('span', 'item__price', `R$${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  items.appendChild(section);
}

const buscarDados = async () => {
  const data = await fetchProducts();
  data.results.forEach(createProductItemElement);
};

const addloading = () => {
  const section = document.querySelector('.container');
  const div = createCustomElement('div', 'loading', 'carregando...');
  section.appendChild(div);
};

const clearLoading = () => {
  const div = document.querySelector('.loading');
  div.remove();
};

const getLocalStorage = () => {
  const data = getSavedCartItems();
  ol.innerHTML = data;
  for (let i = 0; i < ol.children.length; i += 1) {
    ol.children[i].addEventListener('click', cartItemClickListener);
  }
  somar();
};

window.onload = async () => {
  addloading();
  await buscarDados();
  addListennerOnButtons();
  clearLoading();
  somar();
  getLocalStorage();
};
