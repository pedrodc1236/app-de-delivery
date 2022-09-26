import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import { getUser } from '../services/localStorage';
import MyContext from '../context/MyContext';

const ORDER_ID_MAXLENGTH = 4;

function Orders() {
  const { orders, getOrders } = useContext(MyContext);

  useEffect(() => {
    const { token } = getUser();
    getOrders(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <main>
        {orders?.map((order) => (
          <section key={ order.id }>
            <Link
              to={ `/customer/orders/${order.id}` }
            >
              <div
                data-testid={ `customer_orders__element-order-id-${order.id}` }
              >
                <span>
                  Pedido
                </span>
                <span>
                  {String(order.id).padStart(ORDER_ID_MAXLENGTH, 0)}
                </span>
              </div>
              <div
                data-testid={ `customer_orders__element-delivery-status-${order.id}` }
              >
                <span>{order.status}</span>
              </div>
              <div>
                <div
                  data-testid={ `customer_orders__element-order-date-${order.id}` }
                >
                  {order.saleDate}
                </div>
                <div
                  data-testid={ `customer_orders__element-card-price-${order.id}` }
                >
                  R$
                  {order.totalPrice.replace('.', ',')}
                </div>
              </div>
            </Link>
          </section>
        ))}
      </main>
    </div>
  );
}

Orders.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Orders;
