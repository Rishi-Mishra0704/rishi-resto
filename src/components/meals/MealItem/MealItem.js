import React, { useContext } from "react";
import classes from "../../css/MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    const selectedMeal = props.meals.find((meal) => meal._id === props.id);

    if (selectedMeal) {
      cartCtx.addItem({
        id: selectedMeal._id,
        name: selectedMeal.meals[props.id].name,
        amount: amount,
        price: selectedMeal.meals[props.id].price,
      });
    }
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meals[0].meals[props.id].name}</h3>
        <div className={classes.description}>{props.meals[0].meals[props.id].description}</div>
        <div className={classes.price}>{`$${props.meals[0].meals[props.id].price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
