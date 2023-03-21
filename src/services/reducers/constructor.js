import { createSlice } from '@reduxjs/toolkit';
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
        state.bun = { ...action.payload, id: uuidv4() }
      }
      else {
        state.ingredients.push({ ...action.payload, id: uuidv4() });
      }
    },
    removeConstructor: (state, action) => {
      state.ingredients = state.ingredients.filter((ingredient) => ingredient.id != action.payload) 
    },
  }
})


export const { addConstructor, removeConstructor } = constructorSlice.actions; 
export default constructorSlice.reducer;

