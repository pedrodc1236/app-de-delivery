import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function OrderDetailsTable() {
  const { productsById, salesProductById } = useContext(MyContext);

  const subTotal = async () => {
    const total = salesProductById.quantity * productsById.price;
    return total;
  };

  return (
    <div>
      {salesProductById.map((s, index) => (
        <table key={ index }>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th
                data-testid={ `customer_order_details__element-order-table-item-number-
                ${index}` }
              >
                { index }
              </th>
              {productsById.map((product) => (
                <th
                  key={ product.id }
                  data-testid={ `customer_order_details__element-order-table-name-
                  ${index}` }
                >
                  { product.name }
                </th>
              ))}
              <th
                data-testid={ `customer_order_details__element-order-table-quantity-
                ${index}` }
              >
                { s.quantity }
              </th>
              {productsById.map((product) => (
                <th key={ index }>
                  R$
                  <p
                    data-testid={ `customer_order_details__element-order-table-unit-price-
                    ${index}` }
                  >
                    { product.price }
                  </p>
                </th>
              ))}
              <th>
                R$
                <p
                  data-testid={ `customer_order_details__element-order-table-sub-total-
                  ${index}` }
                >
                  { subTotal() }
                </p>
              </th>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default OrderDetailsTable;
