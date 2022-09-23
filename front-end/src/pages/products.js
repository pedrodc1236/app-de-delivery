import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import MyContext from '../context/MyContext';

function Products() {
  const { produtos } = useContext(MyContext);
  const [count, setCount] = useState(0);
  // const [status, setStatus] = useState(0);
  const img = '100px';

  const increment1 = () => {
    setCount((prev) => prev + 1);
  };

  const decrement1 = () => {
    if (count === 0) return;
    setCount((prev) => prev + 1);
  };

  function handleChange() {
    const { name, value } = e.target;
    setCount((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div>
      <Header />
      <main>
        {produtos?.map((p) => (
          <section key={ p.id }>
            <div>
              <img
                src={ p.urlImage }
                alt={ p.name }
                width={ img }
                height={ img }
                data-testid={ `customer_products__img-card-bg-image-${p.id}` }
              />
              <p
                data-testid={ `customer_products_element-card-title${p.id}` }
              >
                {p.name}
              </p>
              <p
                data-testid={ `customer_products__element-card-price-${p.id}` }
              >
                { p.price }
              </p>
              <button
                onClick={ decrement1 }
                data-testid={ `customer_products__button-card-rm-item-${p.id}` }
                type="button"
              >
                -
              </button>
              <input
                onChange={ handleChange }
                value={ count }
                name="teste"
                id={ p.name }
                type="text"
                data-testid={ `customer_products__input-card-quantity-${p.id}` }
              />
              <button
                onClick={ increment1 }
                data-testid={ `customer_products__button-card-add-item-${p.id}` }
                type="button"
              >
                +
              </button>
            </div>
          </section>
        ))}
      </main>
      <button
        data-testid="customer_products__checkout-bottom-value"
        type="button"
        name="total-price"
      >
        Ver Carrinho:
        <span placeholder="0">Inserir Total Dinâmico</span>
      </button>
    </div>
  );
}

Products.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Products;
