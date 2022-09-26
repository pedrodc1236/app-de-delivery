import React from 'react';

function CheckoutTableFinishOrder() {
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
          <tr>
            <td>Item Aqui</td>
            <td>Descricao aqui</td>
            <td>Quantidade aqui</td>
            <td>Valor unitario aqui</td>
            <td>sub-total aqui</td>
            <td>Btn Remover aqui</td>
          </tr>
        </tbody>
      </table>
      <div>{`Total: ${0 + 0}`}</div>
    </section>
  );
}
export default CheckoutTableFinishOrder;
