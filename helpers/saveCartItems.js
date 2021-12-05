const saveCartItems = (item) => {
  localStorage.setItem('carItem', JSON.stringify(item));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
