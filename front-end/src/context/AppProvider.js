import React, { useState } from 'react';
import PropTypes from 'prop-types';

import fetchProducts from '../services/productsApi';

import MyContext from './MyContext';

function AppProvider({ children }) {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const { product } = await fetchProducts();
    setProducts(product);
  }

  const contextValue = {
    products,
    setProducts,
    getProducts,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
