import React, { useState } from 'react';

function CheckoutTableFinishOrder() {
  const [cart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [sumTotal] = useState(JSON.parse(localStorage.getItem('sumTotal')) || 0);
  // data-testid={ }
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((product, index) => (
              <tr
                key={ index }
              >
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  { product.name }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { product.quantity }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  { product.price.replace(/\./, ',') }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { product.subTotal.replace(/\./, ',') }
                </td>
                <td>
                  <button
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    type="button"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div
        data-testid="customer_checkout__element-order-total-price"
      >
        {`Total: ${sumTotal}`}
      </div>
    </section>
  );
}
export default CheckoutTableFinishOrder;
