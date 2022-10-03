import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axiosApi from '../services/axios';
import { addUser, addId } from '../services/localStorage';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem('user'));
    if (getUser) {
      if (getUser.role === 'seller') {
        history.push('/seller/orders');
      } else if (getUser.role === 'customer') {
        history.push('/customer/products');
      } else if (getUser.role === 'administrador') {
        history.push('/admin/manage');
      }
    }
  });

  useEffect(() => {
    const regexEmail = /\S+@\S+\.\S+/;
    const validEmail = regexEmail.test(email);
    const passLength = 6;
    const validPassword = password.length >= passLength;
    setValidate(validEmail && validPassword);
  }, [email, password]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const notFoundNumber = 404;
    const ok = 200;
    try {
      const request = await axiosApi.post('/login', { email, password });
      if (request.status === ok) {
        addUser(
          request.data.name,
          request.data.email,
          request.data.role,
          request.data.token,
        );
        addId(
          request.data.id,
        );
        setNotFound(false);
        if (request.data.role === 'seller') {
          history.push('/seller/orders');
        } else if (request.data.role === 'customer') {
          history.push('/customer/products');
        } else if (request.data.role === 'administrator') {
          history.push('/admin/manage');
        }
      }
    } catch (err) {
      if (err.response.status === notFoundNumber) {
        setNotFound(true);
      }
    }
  };

  const createAccount = (e) => {
    e.preventDefault();
    history.push('/register');
  };

  return (
    <section>
      <h1>Biritas Bar</h1>
      <form method="post">
        <label htmlFor="loginEmail">
          Login
          <input
            data-testid="common_login__input-email"
            id="loginEmail"
            type="email"
            value={ email }
            name="email"
            onChange={ handleChange }
            placeholder="email@trybeer.com.br"
          />
        </label>
        <br />
        <label htmlFor="passwordIn">
          Senha
          <input
            data-testid="common_login__input-password"
            type="password"
            value={ password }
            name="password"
            onChange={ handleChange }
            placeholder="***********"
          />
        </label>
        <br />
        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ !validate }
          onClick={ (e) => handleSubmit(e) }
        >
          LOGIN
        </button>
      </form>
      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ createAccount }
      >
        Ainda Não tenho conta
      </button>
      {
        notFound
        && <div data-testid="common_login__element-invalid-email">E-mail inválido!</div>
      }
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
