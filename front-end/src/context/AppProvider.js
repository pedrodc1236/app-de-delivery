import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { productsList, orderList, orderById, usersById } from '../services/axios';
// import fetchProducts from '../services/productsApi';
// import { getUser } from '../services/localStorage';
import MyContext from './MyContext';

function AppProvider({ children }) {
  const [emailUser, setEmailUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [valueTotal, setValueTotal] = useState(JSON
    .parse(localStorage.getItem('total')) || 0);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState('');
  const [userById, setUserById] = useState('');
  // const [products, setProducts] = useState([]);

  // async function getProducts() {
  //   const { product } = await fetchProducts();
  //   setProducts(product);
  // }

  // const contextValue = {
  //   products,
  //   setProducts,
  //   getProducts,
  // };

  const prodAll = async (t) => {
    const result = await productsList(t);
    const newProduct = result.map((each) => ({
      ...each,
      quantity: 0,
    }));
    setProdutos(newProduct);
  };

  // useEffect(() => {
  //   const { token } = getUser();
  //   prodAll(token);
  // }, []);

const getOrders = async (t) => {
    const result = await orderList(t);
    setOrders(result);
  };

  const getOrderById = async (t, id) => {
    const result = await orderById(t, id);
    setOrderDetails(result);
  };

  const getUserById = async (t, id) => {
    const result = await usersById(t, id);
    console.log(result);
    setUserById(result);
  };

  const contextValue = useMemo(() => ({
    emailUser,
    valueTotal,
    setValueTotal,
    setEmailUser,
    nameUser,
    setNameUser,
    produtos,
    setProdutos,
    loading,
    setLoading,
    prodAll,
    cart,
    setCart,
    total,
    setTotal,
    orders,
    getOrders,
    getOrderById,
    orderDetails,
    getUserById,
    userById,
  }), [
    emailUser,
    nameUser,
    produtos,
    loading,
    valueTotal,
    cart,
    total,
    loading,
    orders,
    orderDetails,
    userById
  ]);

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
