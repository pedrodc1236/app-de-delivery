const fetchProducts = async () => {
  const url = 'http://localhost:3001/products';
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export default fetchProducts;
