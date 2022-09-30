import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosApi from '../services/axios';
import MyContext from '../context/MyContext';
import { getUser } from '../services/localStorage';

function CheckoutDetailsAndAddress() {
  const history = useHistory();

  const { sellers, cart, setCart } = useContext(MyContext);

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
  //   console.log(sellers, 'Opaopa');
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sellers]);

  // useEffect(() => {
  //   const { token } = getUser();
  //   prodAll(token);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const getSeller = async () => {
  //   const { id } = await sellers.find((s) => s.name === detailsInfo.seller);
  //   console.log(sellers, 'seller');
  //   const sellerId = id;
  //   console.log(sellerId, 'sellerId');
  //   return sellerId;
  // };

  const finishOrder = async () => {
    const { id } = JSON.parse(localStorage.getItem('userId'));
    console.log(detailsInfo, 'finishOrder');
    const sellerId = sellers.find((s) => s.name === detailsInfo.seller);
    const total = cart
      .reduce((acc, curr) => acc + Number(curr.subTotal), 0).toFixed(2);
    const newSale = {
      userId: id,
      sellerId: sellerId.id,
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
      await axiosApi.post(
        '/sales_products',
        [...salesProduct],
        { headers: { Authorization: token } },
      );
      setCart([]);
      localStorage.setItem('cart', JSON.stringify([]));
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
        type="submit"
        onClick={ finishOrder }
      >
        FINALIZAR PEDIDO
      </button>
    </section>
  );
}
export default CheckoutDetailsAndAddress;
