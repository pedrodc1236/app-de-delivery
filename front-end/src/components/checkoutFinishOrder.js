import React from 'react';
import CheckoutDetailsAndAddress from './checkoutDetailsAndAddress';
import CheckoutTableFinishOrder from './checkoutTableFinishOrder';

function CheckoutFinishOrder() {
  return (
    <div>
      <h4>Finalizar pedido</h4>
      <CheckoutTableFinishOrder />
      <h4>Detalhes e Endereço para Entrega</h4>
      <CheckoutDetailsAndAddress />
    </div>
  );
}
export default CheckoutFinishOrder;
