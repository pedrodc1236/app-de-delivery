import React, { /* useEffect, */ useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { productsList, orderList, orderById } from '../services/axios';

// import fetchProducts from '../services/productsApi';

import MyContext from './MyContext';

function AppProvider({ children }) {
  const [emailUser, setEmailUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = ('');

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

  const getOrderById = async (t) => {
    const result = await orderById(t);
    setOrderDetails(result);
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
  }), [emailUser, nameUser, produtos, loading, orders, orderDetails]);

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
