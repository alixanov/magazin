import React from 'react';
import { useLocation } from 'react-router-dom';
import { GeneralData } from '../../static';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./filter-product.css";

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

     const filteredItems = productName
          ? GeneralData.filter(item => item.mahsulotnomi === productName)
          : GeneralData;

     const addToBasket = (item) => {
          const basket = getBasket();
          const existingItem = basket.find(basketItem => basketItem.id === item.id);

          if (existingItem) {
               existingItem.count += 1;
          } else {
               item.count = 1;
               basket.push(item);
          }

          setBasket(basket);
          notify();
     }

     const notify = () =>
          toast.success("Товар успешно добавлен в вашу корзину!", {
               position: "top-left",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
          });

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
                         {groupedItems[groupTitle].map((item, index) => (
                              <div className="product__card" key={index}>
                                   <img src={item.img[0]} alt={item.nameproduct} />
                                   <div className="product__info">
                                        <p>{item.nameproduct}</p>
                                        <span>{item.nechtaqolgani} <p>dona qoldi</p></span>
                                        <h3>{item.price} som</h3>
                                   </div>
                                   <div className="product__buy">
                                        <ToastContainer
                                             className="toastify-container"
                                             position="top-right"
                                             autoClose={5000}
                                             hideProgressBar={false}
                                             newestOnTop={false}
                                             closeOnClick
                                             rtl={false}
                                             pauseOnFocusLoss
                                             draggable
                                             pauseOnHover
                                             theme="light"
                                        />
                                        <button onClick={() => addToBasket(item)}>
                                             Sotib olish
                                        </button>
                                   </div>
                              </div>
                         ))}
                    </div>
               ))}
          </div>
     )
}

export default FilteredProduct;
