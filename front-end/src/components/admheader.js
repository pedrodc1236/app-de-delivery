import { useHistory } from 'react-router-dom';
import React from 'react';
import { cleanLocalStorage, getUser } from '../services/localStorage';

function HeaderAdm() {
  const history = useHistory();

  const { name } = getUser();

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
    <nav>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
      >
        GERENCIAR USUÁRIOS
      </button>
      <button
        type="button"
        onClick={ goProfile }
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {name}
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

export default HeaderAdm;
