import React from 'react';
import { useLocation } from 'react-router-dom';
import { GeneralData } from '../../static';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./filter-product.css"
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
                              <p>{item.price} som</p>
                              <button onClick={() => addToBasket(item)}>
                                   Sotib olish
                              </button>
                         </div>
                    </div>
               ))}
          </div>
     )
}

export default FilteredProduct;
