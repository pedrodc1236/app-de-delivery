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
      <h1>Login</h1>
      <form>
        <input
          type="email"
          value={ email }
          name="email"
          onChange={ handleChange }
          placeholder="EMAIL"
        />
        <input
          type="password"
          value={ password }
          name="password"
          onChange={ handleChange }
          placeholder="PASSWORD"
        />
        <button
          type="submit"
          disabled={ !validate }
          onClick={ handleSubmit }
        >
          Enter
        </button>
      </form>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
