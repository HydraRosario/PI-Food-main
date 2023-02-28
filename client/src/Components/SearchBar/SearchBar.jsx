import React from 'react';
import styles from './SearchBar.module.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { getByTitle } from '../../Redux/actions'; 

export default function SearchBar() {
  let dispatch = useDispatch();
  let [ title, setTitle ] = useState("");
  
  let handleInputChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByTitle(title))

  }

  return ( 
  <div className={styles.cont}> 
    <input className={styles.search} 
      type = 'text'
      placeholder='Search Recipe...'
      onChange={ (e) => handleInputChange(e)}
    />
    <button type='submit' onClick={ (e) => handleSubmit(e) } className={styles.btnS}>Search</button>
  </div>
  );
}
