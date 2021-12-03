require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
const url = 'https://api.mercadolibre.com/items/MLB1615760527';


describe('2 - Teste a função fecthItem', () => {
  it('a função fetchItem é uma função', () => {
    const atual = typeof fetchItem;
    console.log(atual);
    const esperado = 'function';
    expect(atual).toBe(esperado);
  });
  it('a função fetchitem com o argumento "MLB1615760527" foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const atual = await fetchItem('MLB1615760527')
    expect(atual).toEqual(item);
  });
  // it('ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
  //   const atual = await fetchItem('MLB1615760527');
  //   expect(atual).toThrow(Error('You must provide an url.'));
  // });
});
