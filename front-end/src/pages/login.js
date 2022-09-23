import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axiosApi from '../services/axios';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    const validEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gm);
    const passLength = 6;
    const validPassword = password.length > passLength;
    setValidate(validEmail && validPassword);
  }, [email, password]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('qualquer coisa', email, password);
    axiosApi.post('/login', { email, password })
      .then((response) => {
        const { data } = response;
        return data;
      }).catch((error) => console.log(error));
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
      <div data-testid="common_login__element-invalid-email">E-mail inválido!</div>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
