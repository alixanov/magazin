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
          axios.get('https://669a7ba49ba098ed61ffcfbc.mockapi.io/magazin')
               .then(response => {
                    const uniqueItems = response.data.filter(
                         (item, index, self) =>
                              index === self.findIndex(
                                   (t) =>
                                        t.swiperuchun === item.swiperuchun &&
                                        t.mahsulotnomi === item.mahsulotnomi
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
                              <Link to={`/product?name=${item.mahsulotnomi}`}>
                                   <img src={item.swiperuchun} alt={item.mahsulotnomi} />
                              </Link>
                              <Link to={`/product?name=${item.mahsulotnomi}`}>
                                   <p>{item.mahsulotnomi}</p>
                              </Link>
                         </SwiperSlide>
                    ))}
               </Swiper>
          </>
     );
};

export default CircleSwiper;
