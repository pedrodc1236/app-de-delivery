import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <section>
      <h1> login </h1>
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (
            <Redirect to="/login" />
          ) }
        />
        <Route exact path="/login" component={ Login } />
      </Switch>
    </section>
  );
}

export default App;
