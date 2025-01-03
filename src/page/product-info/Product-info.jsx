import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicModal from '../../components/modal/BasicModal';
import "./product-info.css";

const Productinfo = () => {
     const location = useLocation();
     const navigate = useNavigate();
     const { product } = location.state;
     const [currentImageIndex, setCurrentImageIndex] = useState(0);

     const nextImage = (e) => {
          e.stopPropagation();
          if (Array.isArray(product.img)) {
               setCurrentImageIndex((prev) =>
                    prev === product.img.length - 1 ? 0 : prev + 1
               );
          }
     };

     const previousImage = (e) => {
          e.stopPropagation();
          if (Array.isArray(product.img)) {
               setCurrentImageIndex((prev) =>
                    prev === 0 ? product.img.length - 1 : prev - 1
               );
          }
     };

     const getCurrentImage = () => {
          if (!product.img) return '';
          if (Array.isArray(product.img)) {
               return product.img[currentImageIndex];
          }
          return product.img;
     };

     const handlePaymentClick = () => {
          // Save the single product info for payment
          localStorage.setItem('totalPrice', product.price);
          localStorage.setItem('quantities', JSON.stringify({ [product.id]: 1 }));
          navigate('/payment');
     };

     return (
          <div className="product-info">
               <div className="product-info__image-container">
                    {Array.isArray(product.img) && product.img.length > 1 && (
                         <button
                              className="product-info__image-nav product-info__image-nav--prev"
                              onClick={previousImage}
                         >
                              &#10094;
                         </button>
                    )}

                    <img
                         src={getCurrentImage()}
                         alt={product.nameproduct}
                         className="product-info__image"
                    />

                    {Array.isArray(product.img) && product.img.length > 1 && (
                         <button
                              className="product-info__image-nav product-info__image-nav--next"
                              onClick={nextImage}
                         >
                              &#10095;
                         </button>
                    )}

                    {Array.isArray(product.img) && product.img.length > 1 && (
                         <div className="product-info__image-dots">
                              {product.img.map((_, index) => (
                                   <span
                                        key={index}
                                        className={`product-info__image-dot ${index === currentImageIndex ? 'active' : ''
                                             }`}
                                        onClick={(e) => {
                                             e.stopPropagation();
                                             setCurrentImageIndex(index);
                                        }}
                                   />
                              ))}
                         </div>
                    )}
               </div>

               <hr className='hr' />

               <div className="product__info-txt">
                    <h2>{product.nameproduct}</h2>
                    <p>Цена: <span>{product.price}</span> $</p>
                    <p>Описание: {product.productinfo}</p>
                    <button
                         className="basket__payment-button"
                         onClick={handlePaymentClick}
                    >
                         Оплатить
                    </button>
               </div>
          </div>
     );
}

export default Productinfo;