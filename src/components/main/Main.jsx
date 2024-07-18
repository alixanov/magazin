import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Katalog, Footer, Basket } from "../"
import {FilteredProduct} from '../../page'




const Main = () => {
  return (
    <div className='main'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/katalog' element={<Katalog />} />
        <Route path="/product" element={<FilteredProduct />} />
        <Route path='/savat' element={<Basket/>} />
      </Routes>
      <Footer />

    </div>
  )
}

export default Main
