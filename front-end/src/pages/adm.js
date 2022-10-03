import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderAdm from '../components/admheader';
import RoleType from '../components/roleType';
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
      await createdUser();
    } else {
      setNotValid(true);
    }
  };

  return (
    <div>
      <HeaderAdm />
      <div>
        <form method="post">
          <label htmlFor="loginEmail">
            Nome
            <input
              data-testid="admin_manage__input-name"
              id="nomeid"
              type="nome"
              value={ nome }
              name="nome"
              onChange={ handleChange }
              placeholder="Seu nome"
            />
          </label>
          <label htmlFor="loginEmail">
            Email
            <input
              data-testid="admin_manage__input-email"
              id="loginEmail"
              type="email"
              value={ email }
              name="email"
              onChange={ handleChange }
              placeholder="email@trybeer.com.br"
            />
          </label>
          <label htmlFor="passwordIn">
            Senha
            <input
              data-testid="admin_manage__input-password"
              type="password"
              value={ password }
              name="password"
              onChange={ handleChange }
              placeholder="***********"
            />
          </label>
          <RoleType />
          <button
            data-testid="admin_manage__button-register"
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
            data-testid="admin_manage__element-invalid-register"
          >
            { messageError }
          </p>)
        }
        <UsersList />
      </div>
    </div>
  );
}

Adm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Adm;
