import React from 'react';
import styles from './Card.module.css';

function Card({title, diets,image, spoonacularScore, servings, dishTypes}) {
  return (
    <div className={styles.card}>
    
      <img src={image} alt="Img not found" className={styles.img}/>
    
    <div className={styles.card_text}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  </div>
  )}

export default Card;
