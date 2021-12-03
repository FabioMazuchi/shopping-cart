require("../mocks/fetchSimulator");
const { fetchProducts } = require("../helpers/fetchProducts");
const computadorSearch = require("../mocks/search");
const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

describe("1 - Teste a função fecthProducts", () => {
  it('a função fetchProducts é uma função', () => {
    const atual = typeof fetchProducts;
    const experado = "function";
    expect(atual).toBe(experado);
  });
  it('a função fetchProducts com o argumento "computador" foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const atual = await fetchProducts('computador');
    expect(atual).toEqual(computadorSearch);
  });
  // it('a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
  //   const atual = await fetchProducts();
  //   const error = new Error('You must provide an url');
  //   expect(atual).toEqual(error);
  // });
});
