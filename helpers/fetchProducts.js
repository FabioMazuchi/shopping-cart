const fetchProducts = async (produto = 'computador') => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;

  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;  
  } catch (error) {
    console.log(error.message);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
