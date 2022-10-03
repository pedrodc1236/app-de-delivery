import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosApi, { sellerList } from '../services/axios';
import MyContext from '../context/MyContext';
import { getUser } from '../services/localStorage';

function CheckoutDetailsAndAddress() {
  const history = useHistory();

  const { cart, setCart } = useContext(MyContext);
  const [sellers, setSellers] = useState([]);
  const [idSeller, setIdSeller] = useState(0);

  const [detailsInfo, setDetailsInfo] = useState({
    id: 1,
    seller: 'Fulana Pereira',
    address: '',
    addressNumber: '',
  });
  const getBySellers = async (t) => {
    const result = await sellerList(t);
    setSellers(result);
    setIdSeller(result[0].id);
  };

  useEffect(() => {
    const { token } = getUser();
    getBySellers(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setDetailsInfo({ ...detailsInfo, [name]: value });
  };

  const handleInput = (e) => {
    setIdSeller(e.target.value);
  };

  const finishOrder = async () => {
    try {
      const pickIdLocalStorage = JSON.parse(localStorage.getItem('userId'));
      const total = cart
        .reduce((acc, curr) => acc + Number(curr.subTotal), 0).toFixed(2);
      const newSale = {
        userId: pickIdLocalStorage.id,
        sellerId: idSeller,
        totalPrice: Number(total),
        deliveryAddress: detailsInfo.address,
        deliveryNumber: detailsInfo.addressNumber,
        saleDate: new Date(),
        status: 'Pendente',
      };

      const { token } = getUser();

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
          value={ idSeller }
          onChange={ handleInput }
        >
          {
            sellers?.map((s, index) => (
              <option
                value={ s.id }
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
          value={ detailsInfo.address }
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
          value={ detailsInfo.addressNumber }
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
