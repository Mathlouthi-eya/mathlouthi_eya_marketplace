import React, { useContext, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md/ic_add';
import { ic_remove } from 'react-icons-kit/md/ic_remove';
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline';
import { Link, useNavigate } from 'react-router-dom'; // Importation de useNavigate
import { auth } from '../config/config';
import Navbar from './NavBar';
import { CartContext } from '../glabal/CartContext';

export const Cart = ({ user }) => {

    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    const navigate = useNavigate(); // Remplacement de useHistory par useNavigate

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                navigate('/login'); // Remplacement de history.push par navigate
            }
        })
    }, [navigate]); // Ajout de navigate comme dépendance du useEffect

    return (
        <>
            <Navbar user={user} />
            <>
                {shoppingCart.length !== 0 && <h1>Panier</h1>}
                <div className='cart-container'>
                    {
                        shoppingCart.length === 0 && <>
                            <div>Aucun article dans votre panier ou une connexion internet lente cause des problèmes (Rafraîchissez la page) ou vous n'êtes pas connecté</div>
                            <div><Link to="/">Retour à la page d'accueil</Link></div>
                        </>
                    }
                    {shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>

                            <div className='cart-img'>
                                <img src={cart.ProductImg} alt="non trouvé" />
                            </div>

                            <div className='cart-name'>{cart.ProductName}</div>

                            <div className='cart-price-orignal'>Rs {cart.ProductPrice}.00</div>

                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_add} size={24} />
                            </div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                <Icon icon={ic_remove} size={24} />
                            </div>

                            <div className='cart-price'>
                                Rs {cart.TotalProductPrice}.00
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    ))}
                    {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Récapitulatif du panier
                        </div>
                        <div className='cart-summary-price'>
                            <span>Prix total</span>
                            <span>{totalPrice}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Quantité totale</span>
                            <span>{totalQty}</span>
                        </div>
                        <Link to='cashout' className='cashout-link'>
                            <button className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
                                Paiement à la livraison
                        </button>
                        </Link>
                    </div>}
                </div>
            </>
        </>
    )
}
export default Cart;
