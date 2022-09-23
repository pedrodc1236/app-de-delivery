import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
// import axiosApi from '../services/axios';
// import { getUser } from '../services/localStorage';
import MyContext from '../context/MyContext';

function Products() {
  const { produtos } = useContext(MyContext);
  /*
  useEffect(() => {
    const { token } = getUser();
    console.log(token);
    // const localToken = Buffer.from(token, 'utf8').toString('base64');
    const teste = async () => {
      try {
        const request = await axiosApi
          .get('/products', { headers: { Authorization: `token ${token}` } });
        if (request.status === ok) {
          setProdutos(request.data);
          console.log(request);
          history.push('/');
        }
      } catch (err) {
        if (err.response.status === notFoundNumber) {
          console.log(err.response.status);
        }
      }
    };
    teste();
  }, []); */

  return (
    <div>
      <Header />
      {console.log(produtos)}
    </div>
  );
}

Products.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Products;
