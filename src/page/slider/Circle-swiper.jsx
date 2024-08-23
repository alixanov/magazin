import React, { useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import axios from "axios";
import "./swiper.css";

const CircleSwiper = () => {
     const [products, setProducts] = useState([]);

     useEffect(() => {
          axios.get('https://magazin-bot-backend.vercel.app/api/getall')
               .then(response => {
                    const uniqueItems = response.data.filter(
                         (item, index, self) =>
                              index === self.findIndex(
                                   (t) =>
                                        t.swiperuchun === item.swiperuchun &&
                                        t.titleProduct === item.titleProduct
                              )
                    );
                    setProducts(uniqueItems);
               })
               .catch(error => console.error("Error fetching data: ", error));
     }, []);

     return (
          <>
               <Swiper
                    modules={[Pagination]}
                    slidesPerView={4}
                    spaceBetween={10}
                    loop={true}
                    className="mySwiper circleSwiper"
                    effect="coverflow"
               >
                    {products.map((item, index) => (
                         <SwiperSlide key={index} className="swipermini__box">
                              <Link to={`/product?name=${item.titleProduct}`}>
                                   <img src={item.swiperuchun} alt={item.titleProduct} />
                              </Link>
                              <Link to={`/product?name=${item.titleProduct}`}>
                                   <p>{item.titleProduct}</p>
                              </Link>
                         </SwiperSlide>
                    ))}
               </Swiper>
          </>
     );
};

export default CircleSwiper;
