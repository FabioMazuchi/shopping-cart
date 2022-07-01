const ol = document.querySelector('.cart__items');
const somaSpan = document.querySelector('.total-price');
const esvaziarBtn = document.querySelector('.empty-cart');
const cartIcon = document.getElementsByTagName('i');
const carrinho = document.querySelector('.cart');
const voltar = document.querySelector('.voltar');
const circle = document.querySelector('.circle__cart');

const removerCart = () => {
  carrinho.style.display = 'none';
}

voltar.addEventListener('click', removerCart);

const exibirCarrinho = () => {
  carrinho.style.display = 'block';
};

cartIcon[0].addEventListener('click', exibirCarrinho);

const somar = () => {
  const array = ol.children;
  let soma = 0;
  for (let i = 0; i < array.length; i += 1) {
    soma += array[i].value;
  }
  somaSpan.innerText = soma.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
};

const esvaziarCarrinho = () => {
  const array = ol.children;

  for (let i = 0; i < array.length; i += i) {
    array[i].remove();  
  }
  somar();
  addNumberOfIconCart();
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
  const select = event.target.parentNode;
  select.classList.add('clicou');

  for (let i = 0; i < array.length; i += 1) {
    if (array[i].classList[1] === 'clicou') {
      array[i].remove();
    }  
  }
  somar();
  addNumberOfIconCart();
}

function createCartItemElement({ id: sku, title: name, price: salePrice, thumbnail }) {
  const li = document.createElement('li');
  // const span__sku = document.createElement('span');
  const span__name = document.createElement('span');
  const span__price = document.createElement('span');
  // const p = document.createElement('p');
  const i = document.createElement('i');
  
  const div = document.createElement('div');

  li.appendChild(createProductImageElement(thumbnail));
  
  // span__sku.innerText = sku;
  // div.appendChild(span__sku);
  
  span__name.innerText = name;
  div.appendChild(span__name);
 
  span__price.innerText = salePrice.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  div.appendChild(span__price);

  li.className = 'cart__item';
  li.value = salePrice;
  li.appendChild(div);

  i.classList.add('fas');
  i.classList.add('fa-times-circle');
  li.appendChild(i);
  
  i.addEventListener('click', cartItemClickListener);
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
  addNumberOfIconCart();
  alert('Produto adicionado com sucesso!')
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
  section.appendChild(createCustomElement('span', 'item__price', `${price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`));
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

const addNumberOfIconCart = () => {
  const qtd = ol.childNodes.length;  
  if (qtd === 0) {
    circle.style.display = 'none';
  } else {
    circle.innerHTML = qtd;
    circle.style.display = 'block';
  }
};

addNumberOfIconCart();

window.onload = async () => {
  addloading();
  await buscarDados();
  addListennerOnButtons();
  clearLoading();
  somar();
  getLocalStorage();
  esvaziarCarrinho();
};
