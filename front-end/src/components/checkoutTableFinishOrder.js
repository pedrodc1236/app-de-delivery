import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function CheckoutTableFinishOrder() {
  const {
    cart,
    setCart,
  } = useContext(MyContext);

  const removeProduct = (product) => {
    const removeP = cart.filter((p) => p.id !== product.id);
    setCart(removeP);
    localStorage.setItem('cart', JSON.stringify(removeP));
  };

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
                    onClick={ () => removeProduct(product) }
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
        {
          `Total: R$ ${
            cart
              .reduce((acc, curr) => acc + Number(curr.subTotal), 0).toFixed(2)
              .replace(/\./, ',')
          }`
        }
      </div>
    </section>
  );
}
export default CheckoutTableFinishOrder;
