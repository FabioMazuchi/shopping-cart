const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;

  const result = await fetch(url);
  const data = await result.json();

  return data;  
};

console.log(fetchItem('MLB1341706310'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
