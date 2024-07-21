import React, { useEffect, useState } from 'react';
import "./basket.css";
import { BasicModal } from '../'; // Ensure the import path is correct
import DeleteIcon from '@mui/icons-material/Delete';

const telegram = window.Telegram.WebApp;

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
      initialQuantities[item.id] = item.count || 1; // Assuming each item has a unique `id` field and `count` field
    });
    setQuantities(initialQuantities);
  }, []);

  const onPlus = (id) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1
    }));
    updateBasketCount(id, quantities[id] + 1);
  }

  const onMinus = (id) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 1) // Ensure quantity doesn't go below 1
    }));
    updateBasketCount(id, quantities[id] - 1);
  }

  const onDelete = (id) => {
    const updatedBasket = basketItems.filter(item => item.id !== id);
    setBasketItems(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));

    const updatedQuantities = { ...quantities };
    delete updatedQuantities[id];
    setQuantities(updatedQuantities);
  }

  const updateBasketCount = (id, count) => {
    const updatedBasket = basketItems.map(item =>
      item.id === id ? { ...item, count } : item
    );
    setBasketItems(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  }

  const totalPrice = () => {
    return basketItems.reduce((total, item) => {
      return total + item.price * (quantities[item.id] || 1);
    }, 0);
  }

  const handlePaymentClick = () => {
    setIsModalOpen(true);
    telegram.MainButton.setText("Оплатить");
    telegram.MainButton.show();
    telegram.MainButton.onClick(() => {
      // Ваш код для обработки оплаты
      console.log("Оплата прошла успешно");
      // Скрыть кнопку после обработки оплаты
      telegram.MainButton.hide();
    });
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='basket'>
      {basketItems.length > 0 ? (
        basketItems.map((item, index) => (
          <div className="basket__item" key={index}>
            <img src={item.img[0]} alt={item.nameproduct} className="basket__image" />
            <div className="basket__details">
              <div className="basket__info">
                <p>{item.nameproduct}</p>
                <span>{item.price * quantities[item.id]} сом</span>
              </div>
              <div className="basket__controls">
                <button onClick={() => onMinus(item.id)}>-</button>
                <p>{quantities[item.id]}</p>
                <button onClick={() => onPlus(item.id)}>+</button>
                <DeleteIcon onClick={() => onDelete(item.id)} className="delete-icon" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Корзина пуста</p>
      )}
      <div className="basket__summary">
        <p>Итого: {totalPrice()} сом</p>
        <button onClick={handlePaymentClick} className="basket__payment-button">Оплата</button>
      </div>
      {isModalOpen && (
        <BasicModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          totalPrice={totalPrice()}
        />
      )}
    </div>
  );
}

export default Basket;
