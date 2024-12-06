// import React from 'react'

// import Electronics from './Electronics';
// import Accessories from './Accessories';
// import Clothing from './Clothing';

// export const Products = () => {

 

//     return (
//         <>

//         <Electronics />
//         <Accessories />
//         <Clothing />
//             {/* {products.length !== 0 && <h1>Produits</h1>}
//             <div className='products-container'>
//                 {products.length === 0 && <div>Internet lent... aucun produit à afficher</div>}
//                 {products.map(product => (
//                     <div className='product-card' key={product.ProductID}>
//                         <div className='product-img'>
//                             <img src={product.ProductImg} alt="Image non trouvée" />
//                         </div>
//                         <div className='product-name'>
//                             {product.ProductName}
//                         </div>
//                         <div className='product-price'>
//                             Rs {product.ProductPrice}.00
//                         </div>
//                         <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>AJOUTER AU PANIER</button>
//                     </div>
//                 ))}
//             </div> */}
//         </>
//     )
// }
// export default Products;
import React, { useContext } from 'react';
import { ProductsContext } from '../glabal/ProductsContext';
import { CartContext } from '../glabal/CartContext';

export const Produits = ({ selectedCategory }) => {
  const { products } = useContext(ProductsContext);
  const { dispatch } = useContext(CartContext);

  // Filtrer les produits par catégorie
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(product => product.ProductCategory === selectedCategory);

  return (
    <div className='products-container'>
      {filteredProducts.length === 0 ? (
        <p>Aucun produit disponible dans cette catégorie.</p>
      ) : (
        filteredProducts.map(product => (
          <div className='product-card' key={product.ProductID}>
            <div className='product-img'>
              <img src={product.ProductImg} alt={product.ProductName} />
            </div>
            <div className='product-name'>{product.ProductName}</div>
            <div className='product-price'>Rs {product.ProductPrice}.00</div>
            <button
              className='addcart-btn'
              onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}
            >
              AJOUTER AU PANIER
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Produits;
