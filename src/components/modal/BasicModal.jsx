import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {CustomSelect} from '../'; // Ensure the import path is correct
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

     return (
          <Modal
               open={isOpen}
               onClose={onClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
          >
               <Box sx={style}>
                    <div className="payment__container">
                         <div className='payment__select'>
                              <h1>Общая сумма к оплате: {totalPrice} сом</h1>
                              <CustomSelect options={paymentOptions} />
                         </div>
                    </div>
                    <div className="payment__inp-number">
                         <input type="text" name="" id="" placeholder='Введите номер карты' />
                         <input type="text" name="" id="" placeholder='ММ/ГГ' />
                    </div>
                    <div className="payment__send">
                         <button>Оплатить</button>
                    </div>
               </Box>
          </Modal>
     );
}
