const request = {
  method: 'POST',
  mode: 'no-cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'teste@teste.com', password: '12312311' }),
};

export const loginApiPost = async () => {
  try {
    const response = await fetch('http://localhost:3001/login', request);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// exemplo para o lint parar de reclamar !!!! \/
export const getMealByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
