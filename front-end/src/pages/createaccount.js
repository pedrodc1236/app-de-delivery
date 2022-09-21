import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import MyContext from '../context/MyContext';

function CreateAccount({ history }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    const validEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gm);
    const passLength = 6;
    const validPassword = password.length > passLength;
    const validName = nome.length > passLength;
    setValidate(validEmail && validPassword && validName);
  }, [email, password, nome]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'nome') setNome(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/login');
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
          disabled={ !validate }
          onClick={ handleSubmit }
        >
          CADASTRAR
        </button>
      </form>
    </section>
  );
}

CreateAccount.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default CreateAccount;
