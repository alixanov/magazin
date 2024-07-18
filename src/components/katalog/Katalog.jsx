import React from 'react';
import { Input } from '../../constants';
import { GeneralData } from '../../static';
import { Link } from 'react-router-dom';
import "./katalog.css"

const Katalog = () => {
  // Используем Set для хранения уникальных значений
  const uniqueItems = Array.from(new Set(GeneralData.map(item => item.mahsulotnomi)))
    .map(nomi => {
      return GeneralData.find(item => item.mahsulotnomi === nomi);
    });

  return (
    <div className='katalog'>
      <Input />
      <div className="katalog__container">
        {
          uniqueItems.map((item, index) => (
            <div className="katalog__list" key={index}>
              <img src={item.umumiyicon} alt="" width={30} />
              <Link to={`/product?name=${item.mahsulotnomi}`}>
                {item.mahsulotnomi}
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Katalog;
