import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GeneralData } from '../../static';

const useQuery = () => {
     return new URLSearchParams(useLocation().search);
}

const getBasket = () => {
     const basket = JSON.parse(localStorage.getItem('basket')) || [];
     return basket;
}

const setBasket = (basket) => {
     localStorage.setItem('basket', JSON.stringify(basket));
}

const FilteredProduct = () => {
     const query = useQuery();
     const productName = query.get('name');

     const filteredItems = GeneralData.filter(item => item.mahsulotnomi === productName);

     const addToBasket = (item) => {
          const basket = getBasket();
          basket.push(item);
          setBasket(basket);
     }

     return (
          <div className='product'>
               {filteredItems.map((item, index) => (
                    <div className="product__card" key={index}>
                         <img src={item.img[0]} alt="" />
                         <div className="product__info">
                              <p>{item.nameproduct}</p>
                              <span>{item.nechtaqolgani} dona qoldi</span>
                         </div>
                         <div className="product__buy">
                              <p>{item.price} som</p>
                              <Link to="#" onClick={() => addToBasket(item)}>
                                   Sotib olish
                              </Link>
                         </div>
                    </div>
               ))}
          </div>
     )
}

export default FilteredProduct;
