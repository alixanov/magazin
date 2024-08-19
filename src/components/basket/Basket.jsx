import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./basket.css";
import { BasicModal } from '../';
import DeleteIcon from '@mui/icons-material/Delete';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    setBasketItems(basket);

    const initialQuantities = {};
    basket.forEach(item => {
      initialQuantities[item.id] = 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const onPlus = (id, event) => {
    event.stopPropagation(); // Останавливаем всплытие события
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1
    }));
  }

  const onMinus = (id, event) => {
    event.stopPropagation(); // Останавливаем всплытие события
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: Math.max(prevQuantities[id] - 1, 1)
    }));
  }

  const onDelete = (id, event) => {
    event.stopPropagation(); // Останавливаем всплытие события
    const updatedBasket = basketItems.filter(item => item.id !== id);
    setBasketItems(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));

    const updatedQuantities = { ...quantities };
    delete updatedQuantities[id];
    setQuantities(updatedQuantities);
  }

  const totalPrice = () => {
    return basketItems.reduce((total, item) => {
      return total + item.price * (quantities[item.id] || 1);
    }, 0);
  }

  const handleProductClick = (product) => {
    navigate('/productbasket', { state: { product } });
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
          <div className="basket__item" key={index} onClick={() => handleProductClick(item)}>
            <img src={item.img[0]} alt={item.nameproduct} className="basket__image" />
            <div className="basket__details">
              <div className="basket__info">
                <p>{item.nameproduct}</p>
                <span>{item.price * quantities[item.id]} $</span>
              </div>
              <div className="basket__controls">
                <button onClick={(event) => onMinus(item.id, event)}>-</button>
                <p>{quantities[item.id]}</p>
                <button onClick={(event) => onPlus(item.id, event)}>+</button>
                <DeleteIcon onClick={(event) => onDelete(item.id, event)} className="delete-icon" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Savat bo'sh</p>
      )}
      <div className="basket__summary">
        <p>Umumiy: {totalPrice()} $</p>
        <button onClick={handlePaymentClick} className="basket__payment-button">To'lovni amalga oshirish</button>
      </div>
      {isModalOpen && (
        <BasicModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          totalPrice={totalPrice()}
          basketItems={basketItems}
          quantities={quantities}
        />
      )}
    </div>
  );
}

export default Basket;
