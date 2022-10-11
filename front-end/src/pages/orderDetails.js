import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/header';
import { getUser } from '../services/localStorage';
import MyContext from '../context/MyContext';
import OrderDetailsTable from '../components/orderDetailsTable';
import { updateById } from '../services/axios';

const ORDER_ID_MAXLENGTH = 4;
const moment = require('moment');

function OrdersDetails() {
  const {
    orderDetails,
    getOrderByIdAndSeller,
    userById,
    totalPriceOrder,
  } = useContext(MyContext);

  const obj = {
    sellerName: 'customer_order_details__element-order-details-label-seller-name',
    status: 'customer_order_details__element-order-details-label-delivery-status',
  };

  const { id } = useParams();

  useEffect(() => {
    const { token } = getUser();
    getOrderByIdAndSeller(token, id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeFinishOrder = async () => {
    const { token } = getUser();
    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber,
      saleDate } = orderDetails;
    const newObj = {
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate,
      status: 'Entregue' };
    const newSale = { ...newObj };
    console.log(newSale);
    await updateById(token, id, newSale);
    getOrderByIdAndSeller(token, id);
  };

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
              {' '}
              {String(orderDetails.id).padStart(ORDER_ID_MAXLENGTH, 0)}
            </p>
            <p
              data-testid={ obj.sellerName }
            >
              P.Vend:
              {userById.name}
            </p>
            <p
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              { moment(orderDetails.saleDate).format('DD/MM/YYYY') }
            </p>
            <p
              data-testid={ obj.status }
            >
              {orderDetails.status}
            </p>
            <button
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              disabled={ orderDetails.status !== 'Em Trânsito' }
              onClick={ changeFinishOrder }
            >
              MARCAR COMO ENTREGUE
            </button>
          </div>
          <OrderDetailsTable />
          <h3 data-testid="customer_order_details__element-order-total-price">
            {Number(totalPriceOrder.totalPrice).toFixed(2).toString().replace('.', ',')}
          </h3>
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
