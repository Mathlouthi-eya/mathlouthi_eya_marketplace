import React, { useContext } from 'react';
import { ProductsContext } from '../glabal/ProductsContext';
import { CartContext } from '../glabal/CartContext';

export const Clothing = () => {
    const { products } = useContext(ProductsContext); // Récupérer les produits depuis le contexte
    const { dispatch } = useContext(CartContext); // Récupérer la méthode `dispatch` pour le panier

    // Debug : Afficher les produits pour vérifier leur récupération
    console.log('Products:', products);

    // Filtrer les produits par catégorie
    const electronics = products.filter(product => product.ProductCategory === 'clothing');

    return (
        <>
   
            {electronics.length !== 0 && <h1>Accessories</h1>}
            <div className='products-container'>
                {electronics.length === 0 && <div>Pas de produits dans cette catégorie.</div>}
                {electronics.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt={product.ProductName} />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            Rs {product.ProductPrice}.00
                        </div>
                        <button
                            className='addcart-btn'
                            onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}
                        >
                            AJOUTER AU PANIER
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Clothing;
