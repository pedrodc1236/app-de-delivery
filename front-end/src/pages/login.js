import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import MyContext from '../context/MyContext';
// import { loginApiPost } from '../services/api';
// import axios from 'axios';
import axiosApi from '../services/axios';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(false);
  // const [teste, setTeste] = useState({});

  useEffect(() => {
    const validEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gm);
    const passLength = 6;
    const validPassword = password.length > passLength;
    setValidate(validEmail && validPassword);
  }, [email, password]);

  /*   useEffect(() => {
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'teste@teste.com', password: '12312311' }),
    };
    fetch('http://localhost:3001/login', requestOptions)
      .then((response) => response.json())
      .then((data) => setTeste(data));
  }, []); */

  /*   useEffect(() => {
    const teste1 = async () => {
      const response = await loginApiPost();
      setTeste(response);
    };
    teste1();
  }, []); */

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  /*   const postteste = () => axios.post('http://localhost:3001/login', {
    email: 'adm@deliveryapp.com', password: '--adm2@21!!--',
  })
    .then(() => {
      console.log('ok');
    })
    .catch((error) => {
      console.log(error);
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    postteste();
  }; */

  /*   const handleSubmit = (e) => {
    const testetext = {
      email,
      password,
    };
    console.log(email, password);
    e.preventDefault();
    fetch('http://localhost:3001/', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify(testetext),
    }).then((response) => setTeste(response)).catch((error) => console.log(error));
    console.log(teste);
    history.push('/login');
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();
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
