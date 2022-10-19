import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderAdm from '../components/admheader';
// import RoleType from '../components/roleType';
import UsersList from '../components/usersList';
import MyContext from '../context/MyContext';
import axiosApi from '../services/axios';
// import { addFavorite, getUser } from '../services/localStorage';

function Adm() {
  const {
    setEmailUser,
    setNameUser,
  } = useContext(MyContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dropdown, setDropdown] = useState('seller');
  const [validate, setValidate] = useState(false);
  const [notValid, setNotValid] = useState(false);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    const regexEmail = /\S+@\S+\.\S+/;
    const validEmail = regexEmail.test(email);
    const passLength = 6;
    const validPassword = password.length >= passLength;
    const nameLength = 12;
    const validName = nome.length >= nameLength;
    // messagensNotValid(validEmail, validPassword, validName);
    setValidate(validEmail && validPassword && validName);
  }, [email, password, nome, dropdown]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'nome') setNome(value);
    if (name === 'dropdown') setDropdown(value);
  };

  const createdUser = async () => {
    try {
      const newUser = { name: nome, email, password, role: dropdown };
      const request = await axiosApi.post('/register', { ...newUser });
      console.log(request);
      setEmailUser(request.data.email);
      setNameUser(request.data.name);
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
      setNotValid(false);
      await createdUser();
      setEmail('');
      setPassword('');
      setNome('');
      setDropdown('seller');
    } else {
      setNotValid(true);
    }
  };

  return (
    <div>
      <HeaderAdm />
      {
        notValid
        && (
          <p
            data-testid="admin_manage__element-invalid-register"
          >
            { messageError }
          </p>)
      }
      <h1>Cadastrar novo usuário</h1>
      <form>
        <label htmlFor="nomeid">
          Nome
          <input
            type="text"
            id="nomeid"
            value={ nome }
            name="nome"
            onChange={ handleChange }
            data-testid="admin_manage__input-name"
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="loginEmail">
          Email
          <input
            type="email"
            id="loginEmail"
            value={ email }
            onChange={ handleChange }
            name="email"
            data-testid="admin_manage__input-email"
            placeholder="email@trybeer.com.br"
          />
        </label>
        <label htmlFor="passwordIn">
          Senha
          <input
            id="passwordIn"
            type="password"
            placeholder="**********"
            value={ password }
            onChange={ handleChange }
            name="password"
            data-testid="admin_manage__input-password"
          />
        </label>
        <label htmlFor="role">
          Tipo
          <select
            id="role"
            value={ dropdown }
            name="dropdown"
            onChange={ handleChange }
            data-testid="admin_manage__select-role"
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
        </label>
        <button
          data-testid="admin_manage__button-register"
          type="submit"
          onClick={ handleSubmit }
          disabled={ !validate }
        >
          CADASTRAR
        </button>
      </form>
      <UsersList />
    </div>
  );
}

Adm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Adm;
