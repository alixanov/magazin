import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Katalog, Footer, Basket, BasicModal, } from "../";
import { FilteredProduct } from '../../page';
import { Login, Register, ResetPassword, Kabinet, ProductInfo} from "../../page"

const Main = () => {
  const showFooter = window.location.pathname !== '/login' && window.location.pathname !== '/register';
  return (
    <div className='main'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/katalog' element={<Katalog />} />
        <Route path="/product" element={<FilteredProduct />} />
        <Route path='/savat' element={<Basket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={< ResetPassword />} />
        <Route path="/kabinet" element={<Kabinet />} />
        <Route path='/productbasket' element={<ProductInfo />} />
        <Route path='payment' element={<BasicModal />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}


export default Main;
