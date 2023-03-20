import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { BURGER_INGREDIENTS_API, getIngredients } from '../../utils/api';
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { fetchIngredientsSlice } from '../../services/reducers/ingredients';
import {DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';




const App = () => {
  const dispatch = useDispatch()

  // const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    dispatch(fetchIngredientsSlice())
  }, [dispatch]);

  return (
    <div className={styles.app}>  
    <AppHeader />
    <DndProvider backend={HTML5Backend}>
      <main className={cn(styles.main)} >
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
    </div>

  )
};

export default App;
