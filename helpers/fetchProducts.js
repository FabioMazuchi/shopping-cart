const fetchProducts = async (produto = 'computador') => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;

  const result = await fetch(url);
  const data = await result.json();
  return data;  
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
