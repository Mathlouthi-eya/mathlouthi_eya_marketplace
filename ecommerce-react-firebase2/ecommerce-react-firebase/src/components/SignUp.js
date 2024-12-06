import React, { useState } from 'react';
import { auth, db } from '../config/config'; // Assurez-vous que le chemin vers 'config' est correct
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Pour interagir avec Firestore
import { Link, useNavigate } from 'react-router-dom'; // Importez useNavigate

export const Signup = () => {

    // Définition des états
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Utilisez useNavigate pour la redirection
    const navigate = useNavigate();

    // Fonction de création de compte
    const signup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                // Ajout des données utilisateur dans Firestore
                setDoc(doc(db, 'SignedUpUsersData', cred.user.uid), {
                    Name: name,
                    Email: email,
                    Password: password  // Attention : ne pas stocker les mots de passe en clair dans un projet réel.
                }).then(() => {
                    // Réinitialiser les champs du formulaire
                    setName('');
                    setEmail('');
                    setPassword('');
                    setError('');
                    // Rediriger vers la page de login après une inscription réussie
                    navigate('/login');  // Redirection vers la page de connexion
                }).catch(err => setError(err.message));
            })
            .catch(err => setError(err.message));
    }

    return (
        <div className='container'>
            <br />
            <h2>Inscription</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={signup}>
                <label htmlFor="name">Nom</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setName(e.target.value)} value={name} />
                <br />
                <label htmlFor="email">Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                <br />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>Soumettre</button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>Vous avez déjà un compte ? Connectez-vous
                <Link to="/login"> ici</Link>
            </span>
        </div>
    );
}

export default Signup;
