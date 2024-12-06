// import NavBar from './NavBar'
// import Produits from './Produits'
// import '../css/Home.css'
// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom' // Remplacer useHistory par useNavigate
// import { auth } from '../config/config'
// import Footer from './Footer'

// const Home = ({user}) => {
//   const navigate = useNavigate(); // Remplacer useHistory par useNavigate

//   useEffect(() => {
//       // Rediriger l'utilisateur vers la page de login s'il n'est pas connecté
//       auth.onAuthStateChanged(user => {
//           if (!user) {
//               navigate('/login'); // Utiliser navigate au lieu de history.push
//           }
//       });
//   }, [navigate]); // Ajouter 'navigate' dans les dépendances de useEffect

//   return (
//     <div className='wrapper'>  
//       <NavBar user={user} />
//       <Produits />
//       <Footer />
//     </div>
//   )
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Remplacer useHistory par useNavigate
import { auth } from '../config/config';
import NavBar from './NavBar';
import Produits from './Produits';
import Footer from './Footer';
import '../css/Home.css';

const Home = ({ user }) => {
  const navigate = useNavigate(); // Remplacer useHistory par useNavigate
  const [selectedCategory, setSelectedCategory] = useState('all'); // État pour la catégorie active

  useEffect(() => {
    // Rediriger l'utilisateur vers la page de login s'il n'est pas connecté
    auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login'); // Utiliser navigate au lieu de history.push
      }
    });
  }, [navigate]); // Ajouter 'navigate' dans les dépendances de useEffect

  return (
    <div className='wrapper'>
      {/* Passer setSelectedCategory pour changer la catégorie via NavBar */}
      <NavBar user={user} setSelectedCategory={setSelectedCategory} />
      {/* Passer selectedCategory pour afficher les produits filtrés */}
      <Produits selectedCategory={selectedCategory} />
      <Footer />
    </div>
  );
};

export default Home;

