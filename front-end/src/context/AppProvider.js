import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// import fetchProducts from '../services/productsApi';

import MyContext from './MyContext';

function AppProvider({ children }) {
  const [emailUser, setEmailUser] = useState('');
  const [nameUser, setNameUser] = useState('');

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

  const contextValue = useMemo(() => ({
    emailUser,
    setEmailUser,
    nameUser,
    setNameUser,
  }), [emailUser, nameUser]);

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
