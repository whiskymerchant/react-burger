import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendOrder } from '../../utils/api';

const initialState = {
  data: null,
  isLoading: false,
  error: null
}

export const fetchOrderSlice = createAsyncThunk(
  'order/fetchOrderSlice',
  async (data, thunkApi) => {
      const response = await sendOrder(data)
      if (!response) {
        return thunkApi.rejectWithValue('Server error')
      }
      return response;
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderSlice.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchOrderSlice.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrderSlice.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
  }

})


export default orderSlice.reducer