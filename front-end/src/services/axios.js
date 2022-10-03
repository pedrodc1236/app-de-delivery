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

export const orderList = async (t) => {
  const result = await axiosApi
    .get('/sales/customer', { headers: { Authorization: t } })
    .catch((error) => error.response.data);
  return result.data;
};

export const orderById = async (t, id) => {
  const result = await axiosApi
    .get(`/sales/${id}`, { headers: { Authorization: t } })
    .catch((error) => error.response.data);
  return result.data;
};

export const usersById = async (t, id) => {
  const result = await axiosApi
    .get(`/users/${id}`, { headers: { Authorization: t } })
    .catch((error) => error.response.data);
  return result.data;
};

export const productById = async (t, id) => {
  const result = await axiosApi
    .get(`/products/sale/${id}`, { headers: { Authorization: t } })
    .catch((error) => error.response.data);
  return result.data;
};

export const salesProductsById = async (t, id) => {
  const result = await axiosApi
    .get(`/sales_products/${id}`, { headers: { Authorization: t } })
    .catch((error) => error.response.data);
  return result.data;
};

export const sellerList = async (t) => {
  const result = await axiosApi
    .get('/users/seller', { headers: { Authorization: t } })
    .catch((error) => error.response.data);
  return result.data;
};

// export const createSale = async (t) => {
//   const result = await axiosApi
//     .post('/sales', { headers: { Authorization: t } })
//     .catch((error) => error.response.data);
//   return result.data;
// };

export const orderListBySeller = async (t) => {
  const result = await axiosApi
    .get('/sales/seller', { headers: { Authorization: t } })
    .catch((error) => error.response.data);
  return result.data;
};

export default axiosApi;
