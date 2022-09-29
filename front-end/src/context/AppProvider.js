import React, { useMemo, useState } from 'react';
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
  const [salesProductById, setSalesProductById] = useState([]);
  const [productsById, setProductsById] = useState([]);

  const prodAll = async (t) => {
    const result = await productsList(t);
    const newProduct = result.map((each) => ({
      ...each,
      quantity: 0,
    }));
    setProdutos(newProduct);
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
    console.log(products);

    setOrderDetails(resultOrders);
    setUserById(resultUsers);
    setSalesProductById(resultSalesProducts);
    setProductsById(products);
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
    getOrderByIdAndSeller,
    orderDetails,
    userById,
    productsById,
    salesProductById,
  }), [
    emailUser,
    nameUser,
    loading,
    orders,
    orderDetails,
    userById,
    productsById,
    salesProductById,
    produtos,
    valueTotal,
    cart,
    total,
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
