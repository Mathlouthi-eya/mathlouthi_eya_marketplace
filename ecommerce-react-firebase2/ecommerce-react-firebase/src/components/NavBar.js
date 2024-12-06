



import React, { useContext } from 'react';
import logo from '../images/ecommerce.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/config';
import { Icon } from 'react-icons-kit';
import { cart } from 'react-icons-kit/entypo/cart';
import { CartContext } from '../glabal/CartContext';

export const NavBar = ({ user, setSelectedCategory }) => {
  const { totalQty } = useContext(CartContext);
  const navigate = useNavigate();  // Pour effectuer la redirection

  // Fonction de déconnexion
  const handleLogout = () => {
    auth.signOut();
    window.location.reload(); // Actualiser la page après la déconnexion
  };

  // Fonction pour changer de catégorie et rediriger
  const handleCategoryClick = (category) => {
    if (window.location.pathname === '/cartproducts') {
      // Stocker la catégorie dans le localStorage avant la redirection
      localStorage.setItem('selectedCategory', category);
      // Rediriger vers la page d'accueil
      navigate('/');
    } else {
      // Si l'utilisateur n'est pas sur la page panier, on met à jour la catégorie
      setSelectedCategory(category);
    }
  };

  // À l'arrivée sur la page d'accueil, récupérer la catégorie depuis le localStorage
  React.useEffect(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      setSelectedCategory(savedCategory);
      localStorage.removeItem('selectedCategory'); // Effacer la catégorie une fois utilisée
    }
  }, [setSelectedCategory]);

  return (
    <div className='navbox'>
      <div className='leftside'>
        <img 
          src={logo} 
          alt="Logo" 
          onClick={() => handleCategoryClick('all')} 
          style={{ cursor: 'pointer' }} 
        />
      </div>

      <div className='middle'>
        {/* Liens pour les catégories */}
        <span onClick={() => handleCategoryClick('all')} className='navlink'>TOUS</span>
        <span onClick={() => handleCategoryClick('electronics')} className='navlink'>ÉLECTRONIQUE</span>
        <span onClick={() => handleCategoryClick('accessories')} className='navlink'>ACCESSOIRES</span>
        <span onClick={() => handleCategoryClick('clothing')} className='navlink'>VÊTEMENTS</span>
      </div>

      {!user ? (
        <div className='rightside'>
          <span><Link to="/signup" className='navlink'>S'INSCRIRE</Link></span>
          <span><Link to="/login" className='navlink'>SE CONNECTER</Link></span>
        </div>
      ) : (
        <div className='rightside'>
          <span><Link to="/" className='navlink'>{user}</Link></span>
          <span><Link to="/cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
          <span className='no-of-products'>{totalQty}</span>
          <span><button className='logout-btn' onClick={handleLogout}>Se déconnecter</button></span>
        </div>
      )}
    </div>
  );
};

export default NavBar;
