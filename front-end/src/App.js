import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import CreateAccount from './pages/createaccount';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <section>
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (
            <Redirect to="/login" />
          ) }
        />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ CreateAccount } />
      </Switch>
    </section>
  );
}

export default App;
