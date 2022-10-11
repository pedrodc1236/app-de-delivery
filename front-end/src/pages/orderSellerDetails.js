import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/sellerheader';
import { getUser } from '../services/localStorage';
import MyContext from '../context/MyContext';
import OrderSellerDetailsTable from '../components/orderSellerDetailsTable';
import { updateById } from '../services/axios';

const ORDER_ID_MAXLENGTH = 4;
const moment = require('moment');

function OrderSallerDetails() {
  const {
    orderDetails,
    getOrderByIdAndSeller,
    totalPriceOrder,
  } = useContext(MyContext);

  const obj = {
    status: 'seller_order_details__element-order-details-label-delivery-status',
  };

  const { id } = useParams();

  useEffect(() => {
    const { token } = getUser();
    getOrderByIdAndSeller(token, id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePreparingOrder = async () => {
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
      status: 'Preparando' };
    const newSale = { ...newObj };
    // setOrderDetails({ ...newSale, id });
    await updateById(token, id, newSale);
    getOrderByIdAndSeller(token, id);
  };

  const changeInTransitOrder = async () => {
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
      status: 'Em Trânsito' };
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
              data-testid="seller_order_details__element-order-details-label-order-id"
            >
              PEDIDO
              {' '}
              {String(orderDetails.id).padStart(ORDER_ID_MAXLENGTH, 0)}
            </p>
            <p
              data-testid="seller_order_details__element-order-details-label-order-date"
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
              data-testid="seller_order_details__button-preparing-check"
              onClick={ changePreparingOrder }
              disabled={ orderDetails.status !== 'Pendente' }
            >
              PREPARAR PEDIDO
            </button>
            <button
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
              onClick={ changeInTransitOrder }
              disabled={ orderDetails.status !== 'Preparando' }
            >
              SAIU PARA ENTREGA
            </button>
          </div>
          <OrderSellerDetailsTable />
          <h3 data-testid="seller_order_details__element-order-total-price">
            {Number(totalPriceOrder.totalPrice).toFixed(2).toString().replace('.', ',')}
          </h3>
        </div>
      </div>
    </div>
  );
}

OrderSallerDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default OrderSallerDetails;
