import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import { getUser } from '../services/localStorage';
import MyContext from '../context/MyContext';

const ORDER_ID_MAXLENGTH = 4;
const moment = require('moment');

function OrdersDetails() {
  const { orderDetails, getOrderByIdAndSeller, userById } = useContext(MyContext);

  const { id } = useParams();

  useEffect(() => {
    const { token } = getUser();
    getOrderByIdAndSeller(token, id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <div>
        <div>
          <h1>Detalhes do Pedido</h1>
          <div key={ orderDetails.id }>
            <p
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              PEDIDO
              {String(orderDetails.id).padStart(ORDER_ID_MAXLENGTH, 0)}
            </p>
            <p
              data-testid={ `customer_order_details__element-order-details-label-seller
                -name` }
            >
              P.Vend:
              {userById.name}
            </p>
            <p
              data-testid={ `customer_order_details__element-order-details-label-order
                -date` }
            >
              { moment(orderDetails.saleDate).format('DD/MM/YY') }
            </p>
            <p
              data-testid={ `customer_order_details__element-order-details-
                label-delivery-status` }
            >
              {orderDetails.status}
            </p>
            {orderDetails.status === 'ENTREGUE' ? (
              <button type="button">
                <p data-testid="customer_order_details__button-delivery-check">
                  MARCAR COMO ENTREGUE
                </p>
              </button>
            ) : (
              <p>PENDENTE</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

OrdersDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default OrdersDetails;
