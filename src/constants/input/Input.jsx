import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./input.css";

const Input = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://magazin-bot-backend.vercel.app/api/getall')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const foundProduct = products.find(item =>
      item.titleProduct.toLowerCase().includes(value) ||
      item.titleProduct.toLowerCase().includes(value) ||
      item.titleProduct.toLowerCase().includes(value)
    );
    setProduct(foundProduct || null);
  };

  const handleProductClick = () => {
    if (product) {
      navigate(`/product?name=${product.titleProduct}`);
    }
  };

  return (
    <div className='search-container'>
      <div className='input'>
        <input
          type="text"
          placeholder='Izlash...'
          value={searchTerm}
          onChange={handleSearch}
        />
        <SearchIcon sx={{ color: "#222222", fontSize: '24px' }} />
      </div>
      {searchTerm && (
        <div className='product-list'>
          {product && (
            <div className='product-item' onClick={handleProductClick}>
              <h2>{product.titleProduct}</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
