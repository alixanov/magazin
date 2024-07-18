import React, { useState, useRef, useEffect } from 'react';
import './paymen-card.css';

const CustomSelect = ({ options }) => {
     const [selected, setSelected] = useState('Выбирите виды оплата');
     const [isOpen, setIsOpen] = useState(false);
     const selectRef = useRef(null);

     const toggleDropdown = () => setIsOpen(!isOpen);

     const handleOptionClick = (option) => {
          setSelected(option);
          setIsOpen(false);
     };

     const handleClickOutside = (event) => {
          if (selectRef.current && !selectRef.current.contains(event.target)) {
               setIsOpen(false);
          }
     };

     useEffect(() => {
          document.addEventListener('click', handleClickOutside);
          return () => {
               document.removeEventListener('click', handleClickOutside);
          };
     }, []);

     return (
          <div className="custom-select" ref={selectRef}>
               <div className="select-selected" onClick={toggleDropdown}>
                    {selected}
                    <span className={isOpen ? 'select-arrow-active' : ''} />
               </div>
               {isOpen && (
                    <div className="select-items">
                         {options.map((option, index) => (
                              <div key={index} onClick={() => handleOptionClick(option)}>
                                   {option}
                              </div>
                         ))}
                    </div>
               )}
          </div>
     );
};

export default CustomSelect;
