import React, { useEffect, useState } from 'react';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    setBasketItems(basket);
  }, []);

  return (
    <div className='basket'>
      {basketItems.length > 0 ? (
        basketItems.map((item, index) => (
          <div className="basket__item" key={index}>
            <img src={item.img[0]} alt={item.nameproduct} />
            <div className="basket__info">
              <p>{item.nameproduct}</p>
              <p>{item.price} som</p>
            </div>
          </div>
        ))
      ) : (
        <p>Корзина пуста</p>
      )}
    </div>
  );
}

export default Basket;
