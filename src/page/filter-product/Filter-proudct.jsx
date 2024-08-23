import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import "./filter-product.css";

const notyf = new Notyf({
     position: {
          x: 'center',
          y: 'top',
     },
     duration: 2000,
});

const useQuery = () => {
     return new URLSearchParams(useLocation().search);
};

const getBasket = () => {
     const basket = JSON.parse(localStorage.getItem('basket')) || [];
     return basket;
};

const setBasket = (basket) => {
     localStorage.setItem('basket', JSON.stringify(basket));
};

const FilteredProduct = () => {
     const [products, setProducts] = useState([]);
     const query = useQuery();
     const productName = query.get('name');

     useEffect(() => {
          axios.get('https://magazin-bot-backend.vercel.app/api/getall')
               .then(response => {
                    setProducts(response.data);
               })
               .catch(error => console.error("Error fetching data: ", error));
     }, []);

     const filteredItems = productName
          ? products.filter(item => item.titleProduct === productName)
          : products;

     const addToBasket = (item) => {
          const basket = getBasket();
          const existingItem = basket.find(basketItem => basketItem._id === item._id);

          if (existingItem) {
               existingItem.count += 1;
          } else {
               item.count = 1;
               basket.push(item);
          }

          setBasket(basket);
          notify();
     };

     const notify = () => notyf.success("Товар успешно добавлен в вашу корзину!");

     const groupedItems = filteredItems.reduce((acc, item) => {
          const group = acc[item.titleProduct] || [];
          group.push(item);
          acc[item.titleProduct] = group;
          return acc;
     }, {});

     return (
          <div className='product-container'>
               {Object.keys(groupedItems).map((groupTitle, idx) => (
                    <div className='product-group' key={idx}>
                         <div className="product__title">
                              <h3>{groupTitle}</h3>
                         </div>
                         <div className="product__wrapper">
                              {groupedItems[groupTitle].map((item, index) => (
                                   <div className="product__card" key={index}>
                                        <img src={item.img} alt={item.nameproduct} />
                                        <div className="product__info">
                                             <p>{item.nameproduct}</p>
                                             <span>{item.nechtaqolgani} <p>dona qoldi</p></span>
                                             <h3>{item.price} $</h3>
                                        </div>
                                        <div className="product__buy">
                                             <button onClick={() => addToBasket(item)}>
                                                  Sotib olish
                                             </button>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               ))}
          </div>
     );
};

export default FilteredProduct;
