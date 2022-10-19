import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  productsList,
  orderList,
  orderById,
  usersById,
  salesProductsById,
  productById,
  sellerList,
  orderListBySeller,
  users,
} from '../services/axios';

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
  const [salesProductById, setSalesProductById] = useState([]);
  const [productsById, setProductsById] = useState([]);
  const [totalSale, setTotalSale] = useState(0);
  const [totalPriceOrder, setTotalPriceOrder] = useState('');
  const [ordersSeller, setOrdersSeller] = useState([]);
  const [usersNotAdmin, setUsersNotAdmin] = useState([]);

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

  const getOrdersSeller = async (t) => {
    const result = await orderListBySeller(t);
    setOrdersSeller(result);
  };

  const getOrderByIdAndSeller = async (t, id) => {
    const resultOrders = await orderById(t, id);
    const { sellerId } = resultOrders;
    const resultUsers = await usersById(t, sellerId);
    const resultSalesProducts = await salesProductsById(t, id);
    const products = await productById(t, id);
    setTotalPriceOrder(resultOrders);
    setOrderDetails(resultOrders);
    setUserById(resultUsers);
    setSalesProductById(resultSalesProducts);
    setProductsById(products);
  };

  const getBySellers = async (t) => {
    const result = await sellerList(t);
    setSellers(result);
  };

  const getUsersNotAdmin = async (t) => {
    const result = await users(t);
    const data = await result.filter((user) => user.role !== 'administrator');
    setUsersNotAdmin(data);
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
    setOrderDetails,
    userById,
    getBySellers,
    sellers,
    productsById,
    salesProductById,
    totalSale,
    setTotalSale,
    totalPriceOrder,
    getOrdersSeller,
    ordersSeller,
    usersNotAdmin,
    getUsersNotAdmin,
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
    sellers,
    totalSale,
    totalPriceOrder,
    ordersSeller,
    usersNotAdmin,
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
