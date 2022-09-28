import React, { /* useEffect */ useContext /* useState */ } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import MyContext from '../context/MyContext';
/* import { addFavorite, getUser } from '../services/localStorage'; */
import CardProduct from '../components/cardProduct';

function Products() {
  const { produtos } = useContext(MyContext);
  return (
    <div>
      <Header />
      <main>
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
    </div>
  );
}

Products.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Products;
