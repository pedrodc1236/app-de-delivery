import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import MyContext from '../context/MyContext';

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
    history.push('/login');
  };

  return (
    <section>
      <h1>Biritas Bar</h1>
      <form>
        <label htmlFor="loginEmail">
          Login
          <input
            data-testid="common_login__input-email"
            id="loginEmail"
            type="email"
            value={ email }
            name="email"
            onChange={ handleChange }
            placeholder="EMAIL"
          />
        </label>
        <br />
        <label htmlFor="passwordIn">
          Password
          <input
            data-testid="common_login__input-password"
            type="password"
            value={ password }
            name="password"
            onChange={ handleChange }
            placeholder="PASSWORD"
          />
        </label>
        <br />
        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ !validate }
          onClick={ handleSubmit }
        >
          LOGIN
        </button>
      </form>
      <button type="button" data-testid="common_login__button-register">
        Ainda Não tenho conta
      </button>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
