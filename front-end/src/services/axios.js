import axios from 'axios';
import { getUser } from './localStorage';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const productsList = async () => {
  const { token } = getUser();
  const result = await axiosApi.get('/products', token)
    .catch((error) => error.response.data);
  return result.data;
};

export default axiosApi;
