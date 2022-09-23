import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import MyContext from '../context/MyContext';

function Products() {
  const { produtos } = useContext(MyContext);
  /* const xablau = produtos.forEach(() => {
    quantidadeSoma
  }); */
  const [count, setCount] = useState(0);
  const img = '100px';

  const increment1 = (e) => {
    const { name } = e.target;
    setCount((prevState) => ({
      ...prevState,
      [name]: prevState[name] ? prevState[name] + 1 : 1,
    }));
  };

  const decrement1 = (e) => {
    const { name } = e.target;
    const min = -1;
    setCount((prevState) => ({
      ...prevState,
      [name]: prevState[name] ? prevState[name] - 1 : min,
    }));
  };

  function handleChange(e) {
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
        {produtos?.map((p, index) => (
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
                data-testid={ `customer_products__element-card-title-${p.id}` }
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
                name={ `quantidadeSoma${index}` }
                data-testid={ `customer_products__button-card-rm-item-${p.id}` }
                type="button"
              >
                -
              </button>
              <input
                onChange={ handleChange }
                value={ count[`quantidadeSoma${index}`] || 0 }
                name={ `quantidadeSoma${index}` }
                id={ p.name }
                type="text"
                data-testid={ `customer_products__input-card-quantity-${p.id}` }
              />
              <button
                onClick={ increment1 }
                name={ `quantidadeSoma${index}` }
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
