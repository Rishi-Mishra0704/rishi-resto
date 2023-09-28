import { useEffect, useState } from "react";
import classes from "../css/AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("http://localhost:4000/meals");
      const responseData = await response.json();

      // Assuming responseData is an array with a single object
      const mealsData = responseData[0]?.meals || {}; // Access "meals" property

      const loadMeals = Object.keys(mealsData).map((mealId) => ({
        id: mealId,
        name: mealsData[mealId].name,
        description: mealsData[mealId].description,
        price: mealsData[mealId].price,
      }));

      setMeals(loadMeals);
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  if (isLoading) {
    return <section className={classes.mealsloading}><p>Loading Please Be Patient</p></section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
