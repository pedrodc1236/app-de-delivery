import React, { /* useEffect, */ useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { productsList } from '../services/axios';
import { getUser } from '../services/localStorage';

// import fetchProducts from '../services/productsApi';

import MyContext from './MyContext';

function AppProvider({ children }) {
  const [emailUser, setEmailUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const { token } = getUser();
    prodAll(token);
  }, []);

  const contextValue = useMemo(() => ({
    emailUser,
    setEmailUser,
    nameUser,
    setNameUser,
    produtos,
    setProdutos,
    loading,
    setLoading,
  }), [emailUser, nameUser, produtos, loading]);

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
