import React,{ useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting ,setIsSubmitting]=useState(false);
  const [didSubmit,setDidSubmit]=useState(false);
  
  const cartCtx = useContext(CartContext);
  console.log(cartCtx);
  const totalAmount = `Rs${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  console.log(hasItems); 
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async(userData) => {
  
    setIsSubmitting(true);
    setDidSubmit(true);
  
   await fetch("https://react-http-7d18f-default-rtdb.firebaseio.com/ordered.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    setIsSubmitting(false)
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Proceed
        </button>
      )}
    </div>
  );
  
  const cardModalContent=<React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
  </React.Fragment>
  
  const isSubmittingContent=<p>Sending order data....</p>
  const didSubmittingContent=
  <React.Fragment>
   <p>Successfully sent the order!</p>
   
   <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
   
  </React.Fragment>
 

  return (
    <Modal onClose={props.onClose}>
      { !isSubmitting  && !didSubmit && cardModalContent}
      { isSubmitting  && isSubmittingContent}
      {!isSubmitting &&  didSubmit && didSubmittingContent}
    </Modal>
  );
};

export default Cart;
