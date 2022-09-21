/* import React, { useContext, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import MyContext from '../context/MyContext'; */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();

  const requests = (e) => {
    e.preventDefault();
    history.push('/login');
  };

  const goProfile = (e) => {
    e.preventDefault();
    history.push('/login');
  };

  const leave = (e) => {
    e.preventDefault();
    history.push('/login');
  };

  return (
    <nav>
      <button
        type="button"
        onClick={ requests }
        data-testid="customer_products__element-navbar-link-orders"
      >
        PEDIDOS
      </button>
      <button
        type="button"
        onClick={ goProfile }
        data-testid="customer_products__element-navbar-user-full-name"
      >
        CICRANO DA SILVA
      </button>
      <button
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
