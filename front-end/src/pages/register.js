import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axiosApi from '../services/axios';
import MyContext from '../context/MyContext';
// import MyContext from '../context/MyContext';
function Register({ history }) {
  const {
    setEmailUser,
    setNameUser,
  } = useContext(MyContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(false);
  const [notValid, setNotValid] = useState(false);
  const [messageError, setMessageError] = useState('');
  // const messagensNotValid = (validEmail, validPassword, validName) => {
  //   if (!validName) {
  //     setMessageError('Nome completo com menos de 12 caracters');
  //   }
  //   if (!validEmail) {
  //     setMessageError('Email inválido');
  //   }
  //   if (!validPassword) {
  //     setMessageError('Senha com menos de 6 caracters');
  //   }
  // };
  useEffect(() => {
    const regexEmail = /\S+@\S+\.\S+/;
    const validEmail = regexEmail.test(email);
    const passLength = 6;
    const validPassword = password.length >= passLength;
    const nameLength = 12;
    const validName = nome.length >= nameLength;
    // messagensNotValid(validEmail, validPassword, validName);
    setValidate(validEmail && validPassword && validName);
  }, [email, password, nome]);
  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'nome') setNome(value);
  };
  const createdUser = async () => {
    try {
      const newUser = { name: nome, email, password, role: 'customer' };
      const request = await axiosApi.post('/register', { ...newUser });
      setEmailUser(request.data.email);
      setNameUser(request.data.name);
      history.push('/customer/products');
    } catch (err) {
      setNotValid(true);
      console.log(err);
      if (err.response.data.message === 'This username already exists') {
        setMessageError('Nome de usuário já existe');
      }
      if (err.response.data.message === 'This email already exists') {
        setMessageError('Esse email já existe');
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate) {
      await createdUser();
    } else {
      setNotValid(true);
    }
  };
  return (
    <section>
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="nomeid">
          Login
          <input
            data-testid="common_register__input-name"
            id="nomeid"
            type="nome"
            value={ nome }
            name="nome"
            onChange={ handleChange }
            placeholder="Seu nome"
          />
        </label>
        <br />
        <label htmlFor="loginEmail">
          Email
          <input
            data-testid="common_register__input-email"
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
            data-testid="common_register__input-password"
            type="password"
            value={ password }
            name="password"
            onChange={ handleChange }
            placeholder="***********"
          />
        </label>
        <br />
        <button
          data-testid="common_register__button-register"
          type="submit"
          onClick={ handleSubmit }
          disabled={ !validate }
        >
          CADASTRAR
        </button>
      </form>
      {
        notValid
        && (
          <p
            data-testid="common_register__element-invalid_register"
          >
            { messageError }
          </p>)
      }
    </section>
  );
}
Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Register;
