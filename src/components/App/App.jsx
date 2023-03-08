import { useState, useEffect } from 'react';

import styles from './App.module.css';
import { BURGER_INGREDIENTS_API, getIngredients } from '../../utils/api';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import cn from 'classnames';

console.log(BURGER_INGREDIENTS_API);
const testTest = getIngredients();
console.log(testTest);

const App = () => {

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then(data => {
        setIngredients(data)
    })
  }, []);

  return (
  <div className={styles.app}>  
    <AppHeader />
    <main className={cn(styles.main)} >
      <BurgerIngredients ingredients={ingredients}/>
      <BurgerConstructor constructorIngredients={ingredients}/>
    </main>
  </div>
  )
}

export default App;