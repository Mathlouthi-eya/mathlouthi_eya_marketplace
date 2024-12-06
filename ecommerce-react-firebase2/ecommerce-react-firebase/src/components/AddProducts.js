import React, { useState } from 'react';
import { db } from '../config/config'; // Assurez-vous que config.js exporte correctement 'db'
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify'; // Import de Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import du CSS pour Toastify

export const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const addProduct = (e) => {
        e.preventDefault();
        if (!imageUrl) {
            setError("Veuillez fournir une URL d'image valide.");
            return;
        }

        // Ajouter le produit à Firestore
        addDoc(collection(db, 'produits'), {
            name: productName,
            price: Number(productPrice),
            category: productCategory,
            description: productDescription,
            imageUrl: imageUrl,
        })
        .then(() => {
            // Afficher un toast de succès
            toast.success('Produit ajouté avec succès!', {
                position: toast.POSITION.TOP_RIGHT, // Positionner le toast
                autoClose: 3000, // Le toast disparaît après 3 secondes
            });

            // Réinitialiser les champs
            setProductName('');
            setProductPrice(0);
            setProductCategory('');
            setProductDescription('');
            setImageUrl('');
            setError('');
        })
        .catch(err => setError(err.message));
    };

    return (
        <div className='container'>
            <br />
            <h2>AJOUTER UN PRODUIT</h2>
            <hr />
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Nom du produit</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />

                <label htmlFor="product-price">Prix du produit</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br />

                <label htmlFor="product-category">Catégorie du produit</label>
                <select 
                    className='form-control' 
                    required
                    onChange={(e) => setProductCategory(e.target.value)} 
                    value={productCategory}>
                    <option value="">Sélectionnez une catégorie</option>
                    <option value="electronics">Électronique</option>
                    <option value="clothing">Vêtements</option>
                    <option value="accessories">Accessoires</option>
                </select>
                <br />

                <label htmlFor="product-description">Description du produit</label>
                <textarea className='form-control' required
                    onChange={(e) => setProductDescription(e.target.value)} value={productDescription}></textarea>
                <br />

                <label htmlFor="product-image">URL de l'image</label>
                <input type="url" className='form-control' required
                    onChange={(e) => setImageUrl(e.target.value)} value={imageUrl} />
                <br />

                <button type="submit" className='btn btn-success btn-md mybtn'>AJOUTER</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}

            {/* Ajout du container de Toast */}
            <ToastContainer />
        </div>
    );
};

export default AddProducts;
