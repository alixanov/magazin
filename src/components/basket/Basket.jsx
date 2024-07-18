import React, { useEffect, useState } from 'react';
import "./basket.css"
import {BasicModal} from '../'; // Убедитесь, что путь к модалке правильный

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    setBasketItems(basket);

    // Initialize quantities
    const initialQuantities = {};
    basket.forEach(item => {
      initialQuantities[item.id] = 1; // Assuming each item has a unique `id` field
    });
    setQuantities(initialQuantities);
  }, []);

  const onPlus = (id) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1
    }));
  }

  const onMinus = (id) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 1) // Ensure quantity doesn't go below 1
    }));
  }

  const totalPrice = () => {
    return basketItems.reduce((total, item) => {
      return total + item.price * (quantities[item.id] || 1);
    }, 0);
  }

  const handlePaymentClick = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='basket'>
      {basketItems.length > 0 ? (
        basketItems.map((item, index) => (
          <div className="basket__item" key={index}>
            <img src={item.img[0]} alt={item.nameproduct} />
            <div className="basket__info">
              <p>{item.nameproduct}</p>
              <span> {totalPrice()}som</span>
            </div>
            <div className="basket__payment">
              <div className="basket__plus-minus">
                <button onClick={() => onPlus(item.id)}>+</button>
                <p>{quantities[item.id]}</p>
                <button onClick={() => onMinus(item.id)}>-</button>
              </div>
              <div className="basket__payment-click">
                <button onClick={handlePaymentClick}>Оплата</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Корзина пуста</p>
      )}
      {isModalOpen && <BasicModal isOpen={isModalOpen} onClose={handleModalClose} />}
    </div>
  );
}

export default Basket;
