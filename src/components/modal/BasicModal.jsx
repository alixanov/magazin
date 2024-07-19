import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CustomSelect } from '../'; // Убедитесь, что путь к импорту правильный
import "./basic-modal.css";

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
     const paymentOptions = ['UzCard', 'Humo', 'Visa'];
     const [cardNumber, setCardNumber] = React.useState('');
     const [expiryDate, setExpiryDate] = React.useState('');
     const [isPaymentValid, setIsPaymentValid] = React.useState(false);

     const formatCardNumber = (value) => {
          return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
     };

     const handleCardNumberChange = (e) => {
          const value = e.target.value.replace(/\s?/g, '');
          if (value.length <= 16) {
               const formattedValue = formatCardNumber(value);
               setCardNumber(formattedValue);
               validatePayment(formattedValue, expiryDate);
          }
     };

     const handleExpiryDateChange = (e) => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 4) {
               const formattedValue = value.replace(/(\d{2})(\d{2})/, '$1/$2');
               setExpiryDate(formattedValue);
               validatePayment(cardNumber, formattedValue);
          }
     };

     const validatePayment = (cardNumber, expiryDate) => {
          const cardNumberValid = cardNumber.replace(/\s/g, '').length === 16;
          const expiryDateValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
          setIsPaymentValid(cardNumberValid && expiryDateValid);
     };

     return (
          <Modal
               open={isOpen}
               onClose={onClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
          >
               <Box sx={style}>
                    <div className="payment__container">
                         <div className="payment__select">
                              <h1>Общая сумма к оплате: {totalPrice} сом</h1>
                              <CustomSelect options={paymentOptions} />
                         </div>
                         <div className="payment__inp-number">
                              <input
                                   type="text"
                                   placeholder='Введите номер карты'
                                   value={cardNumber}
                                   onChange={handleCardNumberChange}
                              />
                              <input
                                   type="text"
                                   placeholder='ММ/ГГ'
                                   value={expiryDate}
                                   onChange={handleExpiryDateChange}
                              />
                         </div>
                         <div className="payment__send">
                              <button className={isPaymentValid ? 'valid' : ''} disabled={!isPaymentValid}>
                                   Оплатить
                              </button>
                         </div>
                    </div>
               </Box>
          </Modal>
     );
}
