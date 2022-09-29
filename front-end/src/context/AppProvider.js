import React, { /* useEffect, */ useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  productsList,
  orderList,
  orderById,
  usersById,
  salesProductsById,
  productById,
} from '../services/axios';

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
  const [salesProductById, setSalesProductById] = useState([]);
  const [productsById, setProductsById] = useState([]);

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

  const getOrderByIdAndSeller = async (t, id) => {
    const resultOrders = await orderById(t, id);
    const { sellerId } = resultOrders;
    const resultUsers = await usersById(t, sellerId);
    const resultSalesProducts = await salesProductsById(t, id);
    const products = await productById(t, id);
    // console.log(resultSalesProducts);
    console.log(products);

    setOrderDetails(resultOrders);
    setUserById(resultUsers);
    setSalesProductById(resultSalesProducts);
    setProductsById(products);
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
    getOrderByIdAndSeller,
    orderDetails,
    userById,
    productsById,
    salesProductById,
  }), [
    emailUser,
    nameUser,
    produtos,
    loading,
    orders,
    orderDetails,
    userById,
    productsById,
    salesProductById,
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
