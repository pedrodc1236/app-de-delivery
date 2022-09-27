import React, { useState } from 'react';

function CheckoutTableFinishOrder() {
  const [cart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [sumTotal] = useState(JSON.parse(localStorage.getItem('sumTotal')) || 0);

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
                <td>
                  { index + 1 }
                </td>
                <td>
                  { product.name }
                </td>
                <td>
                  { product.quantity }
                </td>
                <td>
                  { product.price }
                </td>
                <td>
                  { product.subTotal }
                </td>
                <td>
                  <button
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
      <div>{`Total: ${sumTotal}`}</div>
    </section>
  );
}
export default CheckoutTableFinishOrder;
