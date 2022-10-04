import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import { addFavorite } from '../services/localStorage';
import '../style/products.css';

function CardProduct({ id, nameP, urlImage, priceProd, index }) {
  const {
    cart,
    setCart,
  } = useContext(MyContext);
  const img = '100px';
  const [quantity, setQuantity] = useState('0');

  const addToCart = (countProduct) => {
    const countP = Number(countProduct);
    const product = { id, name: nameP, urlImage, price: priceProd };
    const existsProduct = cart.find((item) => item.id === product.id);
    // editar
    if (existsProduct) {
      setCart(
        cart.map((item) => (item.id === product.id
          ? { ...existsProduct,
            quantity: countP,
            subTotal: (Number(product.price) * countP).toFixed(2) } : item)),
      );
    }

    // adicionar
    if (!existsProduct && countP > 0) {
      setCart([...cart, { ...product,
        quantity: countP,
        subTotal: (Number(product.price) * countP).toFixed(2) }]);
    }

    // remover
    if (countP === 0) {
      const removeProduct = cart.filter((p) => product.id !== p.id);
      setCart([...removeProduct]);
    }

    addFavorite(cart);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    let quantityAtt = Number(value);
    if (Number(value) < 0 || Number.isNaN(Number(value))) {
      quantityAtt = 0;
    }
    setQuantity(quantityAtt);
    addToCart(quantityAtt);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const saveQuantity = JSON.parse(localStorage.getItem('cart'));
    if (!saveQuantity) {
      setCart([]);
    } else {
      setCart(saveQuantity);
      const quantityProduct = saveQuantity.find((p) => p.id === id);
      if (quantityProduct) {
        setQuantity(quantityProduct.quantity);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const increment = () => {
    const addOne = Number(quantity) + 1;
    setQuantity(String(Number(addOne)));
    addToCart(addOne);
  };

  const decrement = () => {
    let removeOne = '0';
    if (quantity === '0') {
      removeOne = '0';
    } else {
      removeOne = Number(quantity) - 1;
    }
    setQuantity(String(Number(removeOne)));
    addToCart(removeOne);
  };

  return (
    <div className="item-sect">
      <p
        className="price"
        data-testid={ `customer_products__element-card-price-${id}` }
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
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
        className="namedrink-sect"
      >
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
        value={ quantity }
        name={ nameP }
        // min="0"
        type="text"
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
