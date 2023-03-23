import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/api";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchIngredientsSlice = createAsyncThunk(
  "ingredients/fetchIngredientsSlice",
  async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const data = await getIngredients();
    if (!data) {
      return rejectWithValue("Server error");
    }
    return data;
  }
);

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    increaseCount: (state, action) => {
      console.log("state.data:", state.data);
      return {
        ...state,
        data: state.data.map((item) => {
          const { count, _id } = item;
          if (_id !== action.payload) {
            return item;
          }
          const isCountExist = typeof count === "number";
          console.log("item type =>", item.type);
          if (item.type === "sauce" || item.type === "main") {
            return {
              ...item,
              count: isCountExist ? count + 1 : 1,
            };
          }
          if (item.count) {
            return {
            ...item,
              count: isCountExist? count + 0 : 1
            };
          }
          return {
            ...item,
            count: isCountExist || count === 0 ? count + 1 : 1,
          };
        }),
      };
    },
    decreaseCount: (state, action) => {
      console.log("action:", action);
      return {
        ...state,
        data: state.data.map((item) => {
          const { count, _id } = item;
          if (_id !== action.payload) {
            return item;
          }
          // const isCountExist = typeof count === 'number'
          // if (!isCountExist) {
          //   return item
          // }
          return {
            ...item,
            count: count > 1 ? count - 1 : null,
          };
        }),
      };
    },
  },
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
      });
  },
});

export const { increaseCount, decreaseCount } = ingredientSlice.actions;

export default ingredientSlice.reducer;
