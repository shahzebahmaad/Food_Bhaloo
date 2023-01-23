import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Invoice from './Components/Invoice';
import Submit from './Components/Submit';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/thanks" element={<Submit />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
