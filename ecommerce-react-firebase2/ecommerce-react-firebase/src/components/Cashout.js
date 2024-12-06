import React, { useState, useEffect, useContext } from 'react';
import { auth, db } from '../config/config';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import { CartContext } from '../glabal/CartContext';
import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';

export const Cashout = (props) => {
    const navigate = useNavigate();
    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    // Variables d'état
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userDocRef = doc(db, 'SignedUpUsersData', user.uid);
                const userSnapshot = await getDoc(userDocRef);
                if (userSnapshot.exists()) {
                    setName(userSnapshot.data().Name);
                    setEmail(userSnapshot.data().Email);
                }
            } else {
                navigate('/login');
            }
        });
    }, [navigate]);
    const cashoutSubmit = async (e) => {
        e.preventDefault();
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const date = new Date();
                const time = date.getTime();
                const buyerDocRef = doc(db, `Buyer-info ${user.uid}`, `_${time}`);
    
                try {
                    // Sauvegarde de la commande dans la base de données
                    await setDoc(buyerDocRef, {
                        BuyerName: name,
                        BuyerEmail: email,
                        BuyerCell: cell,
                        BuyerAddress: address,
                        BuyerPayment: totalPrice,
                        BuyerQuantity: totalQty
                    });
                    setCell('');
                    setAddress('');
                    dispatch({ type: 'EMPTY' });
                    setSuccessMsg('Votre commande a été passée avec succès. Vous serez redirigé vers la page d\'accueil après 5 secondes');
    
                    // Envoi de l'email de confirmation via le backend
                    sendConfirmationEmail();
    
                    setTimeout(() => {
                        navigate('/');
                    }, 5000);
                } catch (err) {
                    setError(err.message);
                }
            }
        });
    };

    const sendConfirmationEmail = async () => {
        const response = await fetch('http://localhost:3001/api/sendOrderConfirmationEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: name,       // Ajoutez le nom du client
            userEmail: email,
            totalQty: totalQty,
            totalPrice: totalPrice,
            address: address,
            phoneNumber: cell     // Ajoutez également le numéro de téléphone
          }),
        });
      
        if (response.ok) {
          console.log('E-mail de confirmation envoyé avec succès');
        } else {
          console.error('Erreur lors de l\'envoi de l\'email');
        }
      };
      

    // const sendConfirmationEmail = async () => {
    //     const response = await fetch('http://localhost:3001/api/sendOrderConfirmationEmail', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         userEmail: email,
    //         totalQty: totalQty,
    //         totalPrice: totalPrice,
    //         address: address,
    //       }),
    //     });
      
    //     if (response.ok) {
    //       console.log('E-mail de confirmation envoyé avec succès');
    //     } else {
    //       console.error('Erreur lors de l\'envoi de l\'email');
    //     }
    //   };
      

    return (
        <>
            <Navbar user={props.user} />
            <div className='container'>
                <h2>Détails de la commande</h2>
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Nom</label>
                    <input type="text" className='form-control' required value={name} disabled />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required value={email} disabled />
                    <label htmlFor="Cell No">Numéro de téléphone</label>
                    <input type="number" className='form-control' required onChange={(e) => setCell(e.target.value)} value={cell} placeholder='ex 03123456789' />
                    <label htmlFor="Delivery Address">Adresse de livraison</label>
                    <input type="text" className='form-control' required onChange={(e) => setAddress(e.target.value)} value={address} />
                    <label htmlFor="Price To Pay">Prix à payer</label>
                    <input type="number" className='form-control' required value={totalPrice} disabled />
                    <label htmlFor="Total No of Products">Nombre total de produits</label>
                    <input type="number" className='form-control' required value={totalQty} disabled />
                    <button type="submit" className='btn btn-success btn-md mybtn'>SOUMETTRE</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    );
};

export default Cashout;
