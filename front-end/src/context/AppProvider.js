import React, { /* useEffect, */ useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { productsList, orderList, orderById, usersById } from '../services/axios';

// import fetchProducts from '../services/productsApi';

import MyContext from './MyContext';

function AppProvider({ children }) {
  const [emailUser, setEmailUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setProdutos(result);
  };

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
    setEmailUser,
    nameUser,
    setNameUser,
    produtos,
    setProdutos,
    loading,
    setLoading,
    prodAll,
    orders,
    getOrders,
    getOrderById,
    orderDetails,
    getUserById,
    userById,
  }), [emailUser, nameUser, produtos, loading, orders, orderDetails, userById]);

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
