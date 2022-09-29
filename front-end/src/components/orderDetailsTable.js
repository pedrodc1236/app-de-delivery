import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function OrderDetailsTable() {
  const { productsById, salesProductById } = useContext(MyContext);

  const newArr = productsById.map((product) => {
    const sProdutcts = salesProductById
      .filter((sp) => sp.productId === product.id);
    // console.log(sProdutcts);
    return {
      ...product,
      ...sProdutcts[0],
    };
  });

  console.log(newArr);

  const subTotal = (quantity, price) => (quantity * price);

  return (
    <div>
      {newArr.map((product, index) => (
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
                { index + 1}
              </th>
              <th
                data-testid={ `customer_order_details__element-order-table-name-
                ${index}` }
              >
                { product.name }
              </th>
              <th
                data-testid={ `customer_order_details__element-order-table-quantity-
                ${index}` }
              >
                { product.quantity }
              </th>
              <th>
                R$
                <p
                  data-testid={ `customer_order_details__element-order-table-unit-price-
                  ${index}` }
                >
                  { product.price }
                </p>
              </th>
              <th>
                R$
                <p
                  data-testid={ `customer_order_details__element-order-table-sub-total-
                  ${index}` }
                >
                  { subTotal(product.quantity, product.price) }
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
