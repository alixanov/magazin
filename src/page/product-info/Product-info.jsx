import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BasicModal from '../../components/modal/BasicModal'; // Импорт вашего модального компонента
import "./product-info.css";

const Productinfo = () => {
     const location = useLocation();
     const { product } = location.state;
     const [isModalOpen, setIsModalOpen] = useState(false);

     const handlePaymentClick = () => {
          setIsModalOpen(true);
     };

     const handleModalClose = () => {
          setIsModalOpen(false);
     };

     return (
          <div className="product-info">
               <img src={product.img[0]} alt={product.nameproduct} className="product-info__image" />
               <hr className='hr' />
               <div className="product__info-txt">
                    <h2>{product.nameproduct}</h2>
                    <p>Цена: <span>{product.price}</span> $</p>
                    <p>Описание: {product.productinfo}</p>
                    <button className="basket__payment-button " onClick={handlePaymentClick}>Оплатить</button>
               </div>

               {/* Использование готового модала для оплаты */}
               {isModalOpen && (
                    <BasicModal
                         isOpen={isModalOpen}
                         onClose={handleModalClose}
                         totalPrice={product.price}
                         basketItems={[product]} // Здесь передаем текущий продукт
                         quantities={{ [product.id]: 1 }} // Устанавливаем количество как 1
                    />
               )}
          </div>
     );
}

export default Productinfo;
