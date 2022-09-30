import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosApi from '../services/axios';
import MyContext from '../context/MyContext';
import { getUser } from '../services/localStorage';

function CheckoutDetailsAndAddress() {
  const history = useHistory();

  const { sellers, cart } = useContext(MyContext);

  const [detailsInfo, setDetailsInfo] = useState({
    seller: 'Fulana Pereira',
    address: '',
    addressNumber: '',
  });

  const { seller, address, addressNumber } = detailsInfo;

  const handleChange = ({ target: { name, value } }) => {
    setDetailsInfo({ ...detailsInfo, [name]: value });
  };

  // useEffect(() => {
  //   const { token } = getUser();
  //   prodAll(token);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const getSeller = () => {
    const { id } = sellers.find((s) => s.name === detailsInfo.seller);
    const sellerId = id;
    return sellerId;
  };

  const finishOrder = async () => {
    const { id } = JSON.parse(localStorage.getItem('userId'));
    const total = cart
      .reduce((acc, curr) => acc + Number(curr.subTotal), 0).toFixed(2);
    console.log(Number(total));
    const newSale = {
      userId: id,
      sellerId: getSeller(),
      totalPrice: Number(total),
      deliveryAddress: detailsInfo.address,
      deliveryNumber: Number(detailsInfo.addressNumber),
      saleDate: new Date(),
      status: 'pendente',
    };

    const { token } = getUser();

    try {
      const createSale = await axiosApi.post(
        '/sales',
        { ...newSale },
        { headers: { Authorization: token } },
      );
      const idSale = createSale.data.id;
      const salesProduct = cart.map((p) => (
        { saleId: idSale, productId: p.id, quantity: p.quantity }
      ));
      const teste = await axiosApi.post(
        '/sales_products',
        [...salesProduct],
        { headers: { Authorization: token } },
      );
      console.log(teste);
      console.log(salesProduct);
      history.push(`/customer/orders/${idSale}`);
    } catch (err) {
      console.log(err);
    }
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
              <option
                key={ index }
              >
                {s.name}
              </option>
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
        onClick={ finishOrder }
      >
        FINALIZAR PEDIDO
      </button>
    </section>
  );
}
export default CheckoutDetailsAndAddress;
