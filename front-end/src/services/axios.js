import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const productsList = async (t) => {
  const result = await axiosApi
    .get('/products', { headers: { Authorization: t } })
    .catch((error) => error.response.data);
  return result.data;
};

export default axiosApi;
