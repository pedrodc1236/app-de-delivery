/* import React, { useContext, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext'; */
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import React, { useContext } from 'react';
import React from 'react';
// import MyContext from '../context/MyContext';
import { cleanLocalStorage, getUser } from '../services/localStorage';
import '../style/header.css';

function Header() {
  const history = useHistory();

  const { name } = getUser();

  /*   const {
    nameUser,
  } = useContext(MyContext); */

  const goProducts = (e) => {
    e.preventDefault();
    history.push('/customer/products');
  };

  const myRequests = (e) => {
    e.preventDefault();
    history.push('/customer/orders');
  };

  const goProfile = (e) => {
    e.preventDefault();
    history.push('/profile');
  };

  const leave = (e) => {
    e.preventDefault();
    cleanLocalStorage();
    history.push('/login');
  };

  return (
    <nav className="header">
      <button
        className="buttonheader"
        type="button"
        onClick={ goProducts }
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </button>
      <button
        className="buttonheader"
        type="button"
        onClick={ myRequests }
        data-testid="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
      </button>
      <button
        className="buttonheader"
        type="button"
        onClick={ goProfile }
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { name }
      </button>
      <button
        className="buttonheader"
        type="button"
        onClick={ leave }
        data-testid="customer_products__element-navbar-link-logout"
      >
        SAIR
      </button>
    </nav>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Header;
