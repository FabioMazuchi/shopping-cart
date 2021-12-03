const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;

  try {
    const result = await fetch(url);
    const data = await result.json();
  
    return data;  
  } catch (error) {
    Error('You must provide an url.');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
