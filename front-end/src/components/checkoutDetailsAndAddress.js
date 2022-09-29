import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

function CheckoutDetailsAndAddress() {
  const { sellers } = useContext(MyContext);

  const [detailsInfo, setDetailsInfo] = useState({
    seller: '',
    address: '',
    addressNumber: '',
  });

  const { seller, address, addressNumber } = detailsInfo;

  const handleChange = ({ target: { name, value } }) => {
    setDetailsInfo({ ...detailsInfo, [name]: value });
  };

  return (
    <section>
      <label
        htmlFor="seller-input"
      >
        P. Vendedora Responsável:
        <select
          data-testid="customer_checkout__select-seller"
          id="seller-input"
          name="seller"
          value={ seller }
          onChange={ handleChange }
        >
          {
            sellers?.map((s, index) => (
              <option key={ index }>{s.name}</option>
            ))
          }
        </select>
      </label>
      <label
        htmlFor="address-input"
      >
        Endereço
        <input
          data-testid="customer_checkout__input-address"
          id="address-input"
          name="address"
          value={ address }
          type="text"
          onChange={ handleChange }
        />
      </label>
      <label
        htmlFor="addressNumber-input"
      >
        Número
        <input
          data-testid="customer_checkout__input-address-number"
          id="addressNumber-input"
          name="addressNumber"
          value={ addressNumber }
          type="text"
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
      >
        FINALIZAR PEDIDO
      </button>
    </section>
  );
}
export default CheckoutDetailsAndAddress;
