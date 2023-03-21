import { configureStore } from '@reduxjs/toolkit';
import ingredients from './reducers/ingredients';
import constructor from './reducers/constructor';
import ingredient from './reducers/currentIngredient';
import order from './reducers/order';

const store = configureStore({
  reducer: {
    ingredientsStore: ingredients,
    constructorStore: constructor,
    currentIngredient: ingredient,
    orderBin: order,
  },
})

export default store;