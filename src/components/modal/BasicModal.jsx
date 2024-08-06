import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import InputMask from 'react-input-mask';
import "./basic-modal.css";
import { useForm } from "react-hook-form";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte

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

export default function BasicModal({ isOpen, onClose, totalPrice }) {
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

          if (data.cardcode === "123456") {
               axios.post('http://localhost:3004/api/add', { ...data, totalPrice })
                    .then(response => {
                         console.log("Success response:", response);
                         notyf.success("Чек отправлен!");
                         onClose();
                    })
                    .catch(error => {
                         console.log("Error response:", error);
                         if (error.response) {
                              notyf.error(`Ошибка: ${error.response.data.message}`);
                         } else {
                              notyf.error("Ошибка при отправке данных");
                         }
                    });
          } else {
               notyf.error("Неверный SMS-код");
          }
     };

     return (
          <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
               <Box sx={style}>
                    <form className="payment__container"
                         onSubmit={handleSubmit(isCardDetailsEntered ? handleSMSCodeSubmit : handleCardDetailsSubmit)}
                    >
                         <div className="payment__select">
                              <h1>Общая сумма к оплате: <p>{totalPrice}</p> $</h1>
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
                                        placeholder='Введите код из СМС'
                                   >
                                        {(inputProps) => <input {...inputProps} />}
                                   </InputMask>
                                   <button type="submit">
                                        Отправить
                                   </button>
                              </div>
                         )}
                    </form>
               </Box>
          </Modal>
     );
}
