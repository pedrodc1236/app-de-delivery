import React, { useEffect, useContext } from 'react';
import CheckoutFinishOrder from '../components/checkoutFinishOrder';
import Header from '../components/header';
import { getUser } from '../services/localStorage';
import MyContext from '../context/MyContext';
import '../style/checkout.css';

function Checkout() {
  const { getBySellers } = useContext(MyContext);

  useEffect(() => {
    const { token } = getUser();
    getBySellers(token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <CheckoutFinishOrder />
    </div>
  );
}
export default Checkout;
