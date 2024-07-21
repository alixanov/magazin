import React, { useState, useEffect } from 'react';
import { Input } from '../../constants';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./katalog.css";

const Katalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://669a7ba49ba098ed61ffcfbc.mockapi.io/magazin')
      .then(response => {
        const uniqueItems = Array.from(new Set(response.data.map(item => item.mahsulotnomi)))
          .map(nomi => {
            return response.data.find(item => item.mahsulotnomi === nomi);
          });
        setProducts(uniqueItems);
      })
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className='katalog'>
      <Input />
      <div className="katalog__container">
        {products.map((item, index) => (
          <div className="katalog__list" key={index}>
            <img src={item.swiperuchun} alt="" width={30} />
            <Link to={`/product?name=${item.mahsulotnomi}`}>
              {item.mahsulotnomi}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Katalog;
