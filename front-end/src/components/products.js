// import React, { useContext, useEffect } from 'react';
// import MyContext from '../context/MyContext';

// function Products() {
//   const { products, getProducts } = useContext(MyContext);

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return products.map((product, index) => {
//     if (index) {
//       return (
//         <div>
//           <p
//             data-testid={ `customer_products__element-card-price-${product.id}` }
//             key={ index }
//           >
//             {`R$ ${product.price}`}
//           </p>
//           <img
//             src={ product.urlImage }
//             alt="product"
//             data-testid={ `customer_products__img-card-bg-image-${product.id}` }
//           />
//           <p data-testid="customer_products__element-card-title-<id>">
//             {product.name}
//           </p>
//         </div>
//       );
//     } return null;
//   });
// }

// Products.propTypes = {
//   name: PropTypes.string.isRequired,
//   urlImage: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
// };

// export default Products;
