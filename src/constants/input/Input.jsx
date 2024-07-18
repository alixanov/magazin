import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import "../input/input.css"

const Input = () => {
  return (
    <div className='input'>
      <input type="text" name="" id="" placeholder='' />
      <SearchIcon sx={{ color: "#222222",fontSize:'33px' }}  />
    </div>
  )
}

export default Input
