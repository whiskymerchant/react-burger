import { createSlice, createSelector } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  bun: null,
  ingredients: []
}


export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addConstructor: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = { ...action.payload, id: uuidv4()}
      }
      else {
        state.ingredients.push({ ...action.payload, id: uuidv4()});
      }
    },
    removeConstructor: (state, action) => {
      state.ingredients = state.ingredients.filter((ingredient) => ingredient.id != action.payload) 
    },
    reorderConstructor: (state, action) => {
      state.ingredients.splice(action.payload.to, 0, state.ingredients.splice(action.payload.from, 1)[0]);
    }
  }
});


export const { addConstructor, removeConstructor, reorderConstructor } = constructorSlice.actions; 
export default constructorSlice.reducer;

