import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setLoading]=useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-7d18f-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        
        if(responseData[key].home_delivery==="available"){
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
            home_delivery: responseData[key].home_delivery,
          });
        }
        }
        
      setMeals(loadedMeals);
      setLoading(false)
      console.log(loadedMeals);
      // console.log(meals);
    };
    fetchMeals();
  }, []);
  
  if(isLoading){
    return(
      <p>loading....</p>
    )
  }
  


  const mealsList =  meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      home_delivery={meal.home_delivery}
    />
  ));


console.log(meals);


  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );


 
};

export default AvailableMeals;
