import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { productsList, orderList, orderById, usersById,
  sellerList } from '../services/axios';
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
  const [sellers, setSellers] = useState([]);

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

  const getOrderById = async (t, id) => {
    const result = await orderById(t, id);
    setOrderDetails(result);
  };

  const getUserById = async (t, id) => {
    const result = await usersById(t, id);
    setUserById(result);
  };

  const getBySellers = async (t) => {
    const result = await sellerList(t);
    setSellers(result);
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
    getBySellers,
    sellers,
  }), [
    emailUser,
    nameUser,
    produtos,
    loading,
    valueTotal,
    cart,
    total,
    orders,
    orderDetails,
    userById,
    sellers,
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
