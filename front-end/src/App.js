import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Product from './pages/products';
import Orders from './pages/orders';
import OrdersDetails from './pages/orderDetails';
import OrdersSeller from './pages/orderSeller';
import Adm from './pages/adm';
import Checkout from './pages/checkout';
import OrderSellerDetails from './pages/orderSellerDetails';

function App() {
  return (
    <section className="main-sect">
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
        <Route exact path="/customer/orders" component={ Orders } />
        <Route exact path="/customer/orders/:id" component={ OrdersDetails } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        <Route exact path="/seller/orders" component={ OrdersSeller } />
        <Route exact path="/admin/manage" component={ Adm } />
        <Route exact path="/seller/orders/:id" component={ OrderSellerDetails } />
      </Switch>
    </section>
  );
}

export default App;
