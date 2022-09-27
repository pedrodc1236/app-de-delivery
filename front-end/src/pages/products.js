import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import MyContext from '../context/MyContext';
import { addFavorite, getUser } from '../services/localStorage';

function Products() {
  const { produtos, prodAll } = useContext(MyContext);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [count, setCount] = useState(0);
  const img = '100px';

  const addToCart = (product, countProduct) => {
    const existsProduct = cart.find((item) => item.id === product.id);
    console.log(count);

    // editar
    if (existsProduct) {
      setCart(
        cart.map((item) => (item.id === product.id
          ? { ...existsProduct,
            quantity: countProduct } : item)),
      );
    }

    // adicionar
    if (!existsProduct && countProduct > 0) {
      setCart([...cart, { ...product, quantity: countProduct }]);
    }

    // remover
    if (countProduct === 0) {
      const removeProduct = cart.filter((p) => product.id !== p.id);
      setCart([...removeProduct]);
    }

    addFavorite(cart);
  };

  useEffect(() => {
    const { token } = getUser();
    prodAll(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function handleChange(e, p, operador) {
    const { value } = e.target;
    let quantityProduct = 0;
    if (operador === '+') {
      quantityProduct = Number(value) + 1;
    }
    if (operador === '-') {
      quantityProduct = Number(value) - 1;
    }
    addToCart(p, quantityProduct);
  }

  const increment1 = (e, produto) => {
    handleChange(e, produto, '+');
    const { name } = e.target;
    setCount((prevState) => ({
      ...prevState,
      [name]: prevState[name] ? prevState[name] + 1 : 1,
    }));
  };

  const decrement1 = (e, produto) => {
    handleChange(e, produto, '-');
    const { name } = e.target;
    const min = -1;
    setCount((prevState) => ({
      ...prevState,
      [name]: prevState[name] ? prevState[name] - 1 : min,
    }));
  };

  return (
    <div>
      <Header />
      <main>
        {produtos?.map((p, index) => (
          <section key={ p.id }>
            <div>
              <p
                data-testid={ `customer_products__element-card-price-${p.id}` }
              >
                { p.price.replace('.', ',') }
              </p>
              <img
                src={ p.urlImage }
                alt={ p.name }
                width={ img }
                height={ img }
                data-testid={ `customer_products__img-card-bg-image-${p.id}` }
              />
              <h1
                data-testid={ `customer_products__element-card-title-${p.id}` }
              >
                {p.name}
              </h1>
              <button
                onClick={ (e) => decrement1(e, p) }
                name={ `quantidadeSoma${index}` }
                value={ count[`quantidadeSoma${index}`] || 0 }
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
                min="0"
                type="number"
                data-testid={ `customer_products__input-card-quantity-${p.id}` }
              />
              <button
                value={ count[`quantidadeSoma${index}`] || 0 }
                onClick={ (e) => increment1(e, p) }
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
