import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./basket.css";
import DeleteIcon from '@mui/icons-material/Delete';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem('basket')) || [];

    // Create a map for quantities and remove duplicates
    const itemMap = new Map();
    const itemQuantities = {};

    storedBasket.forEach(item => {
      const key = `${item.id}-${item.nameproduct}`;

      if (!itemMap.has(key)) {
        // Store the first item with this key
        itemMap.set(key, {
          ...item,
          // Ensure img is the first image from the array if it's an array
          img: Array.isArray(item.img) ? item.img[0] : item.img
        });
      }

      // Count quantities
      itemQuantities[key] = (itemQuantities[key] || 0) + 1;
    });

    // Convert map to array
    const uniqueItems = Array.from(itemMap.values());

    setBasketItems(uniqueItems);
    setQuantities(itemQuantities);
  }, []);

  const updateLocalStorage = (updatedBasket) => {
    const expandedBasket = [];
    updatedBasket.forEach(item => {
      const key = `${item.id}-${item.nameproduct}`;
      const quantity = quantities[key] || 1;
      // Preserve the original item structure but ensure quantity times
      for (let i = 0; i < quantity; i++) {
        expandedBasket.push({
          ...item,
          img: Array.isArray(item.img) ? item.img : [item.img]
        });
      }
    });
    localStorage.setItem('basket', JSON.stringify(expandedBasket));
  };

  const onPlus = (item, event) => {
    event.stopPropagation();
    const key = `${item.id}-${item.nameproduct}`;
    setQuantities(prev => ({
      ...prev,
      [key]: (prev[key] || 1) + 1
    }));
    updateLocalStorage(basketItems);
  };

  const onMinus = (item, event) => {
    event.stopPropagation();
    const key = `${item.id}-${item.nameproduct}`;
    if (quantities[key] > 1) {
      setQuantities(prev => ({
        ...prev,
        [key]: prev[key] - 1
      }));
      updateLocalStorage(basketItems);
    }
  };

  const onDelete = (item, event) => {
    event.stopPropagation();
    const key = `${item.id}-${item.nameproduct}`;
    const updatedBasket = basketItems.filter(basketItem =>
      `${basketItem.id}-${basketItem.nameproduct}` !== key
    );

    setBasketItems(updatedBasket);
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[key];
    setQuantities(updatedQuantities);

    updateLocalStorage(updatedBasket);
  };

  const totalPrice = () => {
    return basketItems.reduce((total, item) => {
      const key = `${item.id}-${item.nameproduct}`;
      return total + (item.price * (quantities[key] || 1));
    }, 0);
  };

  const handleProductClick = (product) => {
    navigate('/productbasket', { state: { product } });
  };

  const handlePaymentClick = () => {
    const total = totalPrice();
    localStorage.setItem('totalPrice', total);
    localStorage.setItem('quantities', JSON.stringify(quantities));
    navigate('/payment');
  };

  const getDisplayImage = (item) => {
    if (Array.isArray(item.img)) {
      return item.img[0];
    }
    return item.img;
  };

  return (
    <div className='basket'>
      {basketItems.length > 0 ? (
        basketItems.map((item) => {
          const key = `${item.id}-${item.nameproduct}`;
          return (
            <div className="basket__item" key={key} onClick={() => handleProductClick(item)}>
              <img
                src={getDisplayImage(item)}
                alt={item.nameproduct}
                className="basket__image"
              />
              <div className="basket__details">
                <div className="basket__info">
                  <p>{item.nameproduct}</p>
                  <span>{item.price * (quantities[key] || 1)} $</span>
                </div>
                <div className="basket__controls">
                  <button onClick={(event) => onMinus(item, event)}>-</button>
                  <p>{quantities[key] || 1}</p>
                  <button onClick={(event) => onPlus(item, event)}>+</button>
                  <DeleteIcon onClick={(event) => onDelete(item, event)} className="delete-icon" />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>Savat bo'sh</p>
      )}
      <div className="basket__summary">
        <p>Umumiy: {totalPrice()} $</p>
        <button onClick={handlePaymentClick} className="basket__payment-button">
          To'lovni amalga oshirish
        </button>
      </div>
    </div>
  );
};

export default Basket;