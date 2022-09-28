import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { productsList } from '../services/axios';
// import fetchProducts from '../services/productsApi';
import { getUser } from '../services/localStorage';

import MyContext from './MyContext';

function AppProvider({ children }) {
  const [emailUser, setEmailUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(JSON
    .parse(localStorage.getItem('count')) || {});
  const [valueTotal, setValueTotal] = useState(JSON
    .parse(localStorage.getItem('total')) || 0);
  const prodAll = async (t) => {
    const result = await productsList(t);
    /* result.push({ quantidade: 0 }); */
    const newProduct = result.map((each) => ({
      ...each,
      quantity: 0,
    }));
    setProdutos(newProduct);
  };

  useEffect(() => {
    const { token } = getUser();
    prodAll(token);
  }, []);

  const contextValue = useMemo(() => ({
    emailUser,
    quantity,
    setQuantity,
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
  }), [emailUser, nameUser, produtos, loading, quantity, valueTotal]);

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
