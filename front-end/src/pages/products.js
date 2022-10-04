import React, { useEffect, useContext /* useState */ } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import MyContext from '../context/MyContext';
import { getUser } from '../services/localStorage';
import CardProduct from '../components/cardProduct';
import BtnTotal from '../components/btnTotal';
import '../style/products.css';

function Products() {
  const { produtos, prodAll } = useContext(MyContext);

  useEffect(() => {
    const { token } = getUser();
    prodAll(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <main className="main-sect">
        {produtos?.map((produto, index) => (
          <CardProduct
            key={ index }
            id={ produto.id }
            index={ index }
            nameP={ produto.name }
            urlImage={ produto.urlImage }
            quantity={ produto.quantity }
            priceProd={ produto.price.replace(('.', ',')) }
          />
        ))}
      </main>
      <BtnTotal />
    </div>
  );
}

Products.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Products;
