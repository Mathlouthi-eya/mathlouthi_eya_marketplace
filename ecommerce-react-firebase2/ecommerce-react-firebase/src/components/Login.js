import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Affiche les informations principales de l'utilisateur
                console.log('Utilisateur connecté:', {
                    email: user.email,
                    uid: user.uid,
                    emailVerified: user.emailVerified,
                });

                setEmail('');
                setPassword('');
                setError('');
                navigate('/');  // Redirection après connexion réussie
            })
            .catch((err) => setError(err.message));  // Afficher l'erreur si la connexion échoue
    }

    return (
        <div className='container'>
            <br />
            <h2>Connexion</h2>
            <br />
            <form autoComplete="off" className='form-group' onSubmit={login}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className='form-control'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <br />
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    className='form-control'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>
                    Connexion
                </button>
            </form>
            {error && <span className='error-msg'>{error}</span>}
            <br />
            <span>Pas encore de compte ? Inscrivez-vous
                <Link to="/signup"> ici</Link>
            </span>
        </div>
    );
}

export default Login;
