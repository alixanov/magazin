import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { GeneralData } from '../../static';
import { useNavigate } from 'react-router-dom';
import "./input.css";

const Input = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Поиск товара по запросу
    const foundProduct = GeneralData.find(item =>
      item.titleProduct.toLowerCase().includes(value) ||
      item.mahsulotnomi.toLowerCase().includes(value) ||
      item.nameproduct.toLowerCase().includes(value)
    );
    setProduct(foundProduct || null);
  };

  const handleProductClick = () => {
    if (product) {
      navigate(`/product?name=${product.mahsulotnomi}`);
    }
  };

  return (
    <div className='search-container'>
      <div className='input'>
        <input
          type="text"
          placeholder='Поиск...'
          value={searchTerm}
          onChange={handleSearch}
        />
        <SearchIcon sx={{ color: "#222222", fontSize: '24px' }} />
      </div>
      {searchTerm && (
        <div className='product-list'>
          {product && (
            <div className='product-item' onClick={handleProductClick}>
              <h2>{product.nameproduct}</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
