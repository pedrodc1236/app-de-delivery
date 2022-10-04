import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import '../style/btnTotal.css';

function BtnTotal() {
  const history = useHistory();

  const {
    cart,
    setTotalSale,
  } = useContext(MyContext);

  const [total, setTotal] = useState(0);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const func = () => {
    const arrayAllPrices = cart.map((p) => parseFloat(p.subTotal));
    const reduceTotal = arrayAllPrices
      .reduce((acc, curr) => acc + curr, 0).toFixed(2)
      .replace(/\./, ',');

    if (reduceTotal !== '0,00') {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
    setTotal(reduceTotal);
    setTotalSale(reduceTotal);
  };

  const goCheckout = () => {
    history.push('/customer/checkout');
  };

  useEffect(() => {
    func();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  return (
    <div className="total">
      <button
        className="button"
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ disabledBtn }
        onClick={ goCheckout }
      >
        <p>Total: </p>
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { total }
        </span>
      </button>
    </div>
  );
}

BtnTotal.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default BtnTotal;
