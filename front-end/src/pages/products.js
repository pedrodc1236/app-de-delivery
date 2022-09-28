import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import MyContext from '../context/MyContext';
import { addFavorite, getUser } from '../services/localStorage';

function Products({ history }) {
  const { produtos, prodAll } = useContext(MyContext);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [count, setCount] = useState(JSON.parse(localStorage.getItem('count')) || []);
  const [sumTotal, setSumTotal] = useState(JSON
    .parse(localStorage.getItem('sumTotal')) || 0);
  const img = '100px';
  const [btnCar, setBtnCar] = useState(true);

  const addToCart = (product, countProduct) => {
    const existsProduct = cart.find((item) => item.id === product.id);
    // editar
    if (existsProduct) {
      setCart(
        cart.map((item) => (item.id === product.id
          ? { ...existsProduct,
            quantity: countProduct,
            subTotal: (Number(product.price) * countProduct).toFixed(2) } : item)),
      );
    }

    // adicionar
    if (!existsProduct && countProduct > 0) {
      setCart([...cart, { ...product,
        quantity: countProduct,
        subTotal: (Number(product.price) * countProduct).toFixed(2) }]);
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
    if (cart.length === 0) {
      setBtnCar(true);
    } else {
      setBtnCar(false);
    }
    localStorage.setItem('sumTotal', JSON.stringify(sumTotal));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('count', JSON.stringify(count));
  }, [sumTotal, count, cart]);

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

  const funcSumTotal = (valor) => {
    const valorBebida = parseFloat(valor);
    const arrayAllPrices = cart.map((p) => parseFloat(p.subTotal));
    const reducerSumTotal = arrayAllPrices
      .reduce((acc, curr) => acc + curr, valorBebida);

    setSumTotal(reducerSumTotal.toFixed(2).replace(/\./, ','));
  };

  const funcSubTotal = (valor) => {
    if (Number(sumTotal) > 0) {
      setSumTotal((sumTotal - valor).toFixed(2).replace(/\./, ','));
    } else {
      setSumTotal((0).toFixed(2).replace(/\./, ','));
    }
  };

  const increment1 = async (e, produto) => {
    handleChange(e, produto, '+');
    const { name } = e.target;
    setCount((prevState) => ({
      ...prevState,
      [name]: prevState[name] ? prevState[name] + 1 : 1,
    }));
    localStorage.setItem('count', JSON.stringify(count));
    funcSumTotal(produto.price);
  };

  const decrement1 = async (e, produto) => {
    handleChange(e, produto, '-');
    const { name } = e.target;
    const min = 0;
    setCount((prevState) => ({
      ...prevState,
      [name]: prevState[name] ? prevState[name] - 1 : min,
    }));
    localStorage.setItem('count', JSON.stringify(count));
    funcSubTotal(produto.price);
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
                onChange={ (e) => handleChange(e, p) }
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
        type="button"
        name="total-price"
        data-testid="customer_products__button-cart"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ btnCar }
      >
        <span
          data-testid="customer_products__checkout-bottom-value"
          placeholder="0"
        >
          { sumTotal }
        </span>
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
