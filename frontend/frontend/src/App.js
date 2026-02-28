import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/footer';
import { Routes, Route } from 'react-router-dom';
import ProductDeatail from './pages/ProductDeatail';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Cart } from './pages/Cart';

function App() {
 const [cartItems,setCartItems] = useState([]);

  return (
    <div className="App">
      <ToastContainer theme='light' position='top-center'/>
      <Header  cartItems={cartItems}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/search' element={<Home /> }/>
        <Route path='/product/:id' element={<ProductDeatail cartItems={cartItems} setCartItems={setCartItems} />}
/>
        <Route path='cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
