import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';

function CardProduct({ id, nameP, urlImage, priceProd, index }) {
  const { setQuantity, quantity, setValueTotal, valueTotal } = useContext(MyContext);
  const img = '100px';

  const sumByInput = (param) => {
    const n = Number(param);
    const calc = valueTotal + n;
    setValueTotal(calc);
  };

  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(quantity));
    localStorage.setItem('total', JSON.stringify(valueTotal));
  }, [quantity, valueTotal]);

  const subByInput = (param) => {
    const n = Number(param);
    const calc = valueTotal - n;
    setValueTotal(calc);
  };

  const increment = () => {
    setQuantity((prevState) => ({
      ...prevState,
      [nameP]: prevState[nameP] ? quantity[nameP] + 1 : 1,
    }));
    sumByInput(priceProd);
    localStorage.setItem('count', JSON.stringify(quantity));
  };

  const decrement = () => {
    setQuantity((prevState) => ({
      ...prevState,
      [nameP]: prevState[nameP] ? quantity[nameP] - 1 : 0,
    }));
    if (valueTotal > 0) {
      subByInput(priceProd);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setQuantity((prevState) => ({
      ...prevState,
      quantity: value,
    }));
  };
  /*   console.log(valueTotal.toFixed(2)); */

  /*   console.log(quantity); */
  return (
    <div>
      <p
        data-testid={ `customer_products__element-card-priceProd-${id}` }
        key={ id }
      >
        {`R$ ${priceProd.replace('.', ',')}`}
      </p>
      <img
        height={ img }
        width={ img }
        src={ urlImage }
        alt="product"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>
        {nameP}
      </p>
      <button
        onClick={ decrement }
        name={ id }
        id={ index }
        value={ priceProd }
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
      >
        -
      </button>
      <input
        onChange={ (e) => handleChange(e) }
        value={ quantity[nameP] || 0 }
        name={ nameP }
        min="0"
        type="number"
        id={ priceProd }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        onClick={ increment }
        name={ id }
        id={ index }
        value={ priceProd }
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
      >
        +
      </button>
    </div>
  );
}

CardProduct.propTypes = {
  nameP: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  priceProd: PropTypes.string.isRequired,
};

export default CardProduct;
