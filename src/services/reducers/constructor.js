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
      state.ingredients.push({ ...action.payload, id: uuidv4() });
    } 
  }

})

export const { addConstructor } = constructorSlice.actions; 
export default constructorSlice.reducer

