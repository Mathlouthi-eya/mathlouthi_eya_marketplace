import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.css';
import { AddProducts } from './components/AddProducts';
import { ProductsContextProvider } from './glabal/ProductsContext';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { auth, db } from './config/config';
import { doc, getDoc } from 'firebase/firestore';
import { CartContextProvider } from './glabal/CartContext';
import 'react-toastify/dist/ReactToastify.css'; 
import Cart from './components/Cart';
import Cashout from './components/Cashout';
import Electronics from './components/Electronics';
import Accessories from './components/Accessories';
import Clothing from './components/Clothing';

export class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = doc(db, 'SignedUpUsersData', user.uid);
        const snapshot = await getDoc(userDoc);
        if (snapshot.exists()) {
          this.setState({
            user: snapshot.data().Name,
          });
        } else {
          console.error("Aucun document trouvé pour cet utilisateur");
        }
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <ProductsContextProvider>
          <CartContextProvider>
            <BrowserRouter>
              <Routes>
                <Route exact path='/' element={<Home user={this.state.user} />} />
                <Route exact path='/addproducts' element={<AddProducts />} />
                <Route exact path='/signup' element={<SignUp />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/cartproducts' element={<Cart user={this.state.user} />} />
                <Route exact path='/cartproducts/cashout' element={<Cashout user={this.state.user} />} />
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/clothing" element={<Clothing />} />
              </Routes>
            </BrowserRouter>
          </CartContextProvider>
        </ProductsContextProvider>
      </div>
    );
  }
}

export default App;
