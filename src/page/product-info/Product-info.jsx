import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Импорт модулей Swiper
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "./product-info.css";

const Productinfo = () => {
     const location = useLocation();
     const navigate = useNavigate();
     const { product } = location.state;

     useEffect(() => {
          // Проверяем данные при монтировании
          console.log('Product data:', product);
          console.log('Images:', product.img);
     }, [product]);

     const handlePaymentClick = () => {
          localStorage.setItem('totalPrice', product.price);
          localStorage.setItem('quantities', JSON.stringify({ [product.id]: 1 }));
          navigate('/payment');
     };

     if (!product || !product.img) {
          return <div>Loading...</div>;
     }

     return (
          <div className="product-info">
               <div className="product-info__image-container">
                    <Swiper
                         modules={[Navigation, Pagination, Autoplay]}
                         navigation={true}
                         pagination={{
                              clickable: true,
                              dynamicBullets: true,
                         }}
                         loop={true}
                         autoplay={{
                              delay: 3000,
                              disableOnInteraction: false,
                         }}
                         className="product-swiper"
                         spaceBetween={30}
                         slidesPerView={1}
                         onSwiper={(swiper) => console.log(swiper)}
                         onSlideChange={() => console.log('slide change')}
                    >
                         {Array.isArray(product.img) ? (
                              product.img.map((image, index) => (
                                   <SwiperSlide key={index}>
                                        <div className="swiper-slide-container">
                                             <img
                                                  src={image}
                                                  alt={`${product.nameproduct} ${index + 1}`}
                                                  className="product-info__image"
                                                  loading="lazy"
                                             />
                                        </div>
                                   </SwiperSlide>
                              ))
                         ) : (
                              <SwiperSlide>
                                   <div className="swiper-slide-container">
                                        <img
                                             src={product.img}
                                             alt={product.nameproduct}
                                             className="product-info__image"
                                             loading="lazy"
                                        />
                                   </div>
                              </SwiperSlide>
                         )}
                    </Swiper>
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