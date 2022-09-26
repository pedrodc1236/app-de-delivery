import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Product from './pages/products';
import AppProvider from './context/AppProvider';
import Checkout from './pages/checkout';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <section>
      <AppProvider>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Redirect to="/login" />
            ) }
          />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ Product } />
          <Route exact path="/customer/checkout" component={ Checkout } />
        </Switch>
      </AppProvider>
    </section>
  );
}

export default App;
