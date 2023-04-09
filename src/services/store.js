import { configureStore } from '@reduxjs/toolkit';
import ingredients from './reducers/ingredients';
import constructor from './reducers/constructor';
import ingredient from './reducers/currentIngredient';
import order from './reducers/order';
import user from './reducers/user';


const store = configureStore({
  reducer: {
    ingredientsStore: ingredients,
    constructorStore: constructor,
    currentIngredient: ingredient,
    orderBin: order,
    loadUser: user
  },
})

export default store;