import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredients } from '../../utils/api';

const initialState = {
  data: [],
  isLoading: false,
  error: null
}

export const fetchIngredientsSlice = createAsyncThunk(
  'ingredients/fetchIngredientsSlice',
  async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const data = await getIngredients()
    if (!data) {
      return rejectWithValue('Server error')
    }
    return data;
  }
)

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsSlice.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchIngredientsSlice.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredientsSlice.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
  }

})


export default ingredientSlice.reducer