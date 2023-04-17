import { configureStore } from '@reduxjs/toolkit';
import ingredients, { TIngredientsState } from './reducers/ingredients';
import constructor, { IConstructor } from './reducers/constructor';
import ingredient, { TCurrentIngredient } from './reducers/currentIngredient';
import order, { IInitialState } from './reducers/order';
import user, { TUserState } from './reducers/user';
import { useDispatch } from 'react-redux'

export interface IRootReducer {
  ingredientsStore: TIngredientsState,
  constructorStore: IConstructor,
  currentIngredient: TCurrentIngredient,
  orderBin: IInitialState,
  loadUser: TUserState,
}

const store = configureStore({
  reducer: {
    ingredientsStore: ingredients,
    constructorStore: constructor,
    currentIngredient: ingredient,
    orderBin: order,
    loadUser: user
  },
})

export type Store = typeof store.dispatch;
export const useAppDispatch: () => Store = useDispatch;
// export type RootState = typeof store.getState;

export default store;