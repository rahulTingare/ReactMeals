import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';


const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `Rs${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };
  
  const style={
    "margin-top": "0.25rem",
    "font-weight": "bold",
    "color": "black"
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        <div className={classes.home_delivery} style={{color: "#ad5502"}}>
        <span style={style}> home-Delivery: </span>
        { props.home_delivery}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
