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
      const currentIngredientId = action.payload._id;
      const currentIngredientType = action.payload.type;

      state.data = state.data.map((ingredient) => {
        let count;
        if (ingredient.type === "bun" && currentIngredientType === "bun") {
          ingredient.count = null; // changed to null instead of 0
        }
        if (ingredient._id === currentIngredientId) {
          if (ingredient.type === "bun") {
            count = 2;
          } else {
            count = ingredient.count ? ++ingredient.count : 1;
          }
        }
        return ingredient._id === currentIngredientId
          ? {
              ...ingredient,
              count: count,
            }
          : ingredient;
      });

      // let bunCount = 0;
      // const newData = state.data.map((item) => {
      //   const { count, _id } = item;
      //   if (_id !== action.payload) {
      //     return item;
      //   }
      //   const isCountExist = typeof count === "number";
      //   if (item.type === "sauce" || item.type === "main") {
      //     return {
      //       ...item,
      //       count: isCountExist ? count + 1 : 1,
      //     };
      //   }
      //   if (item.type === "bun") {
      //     bunCount += 1;
      //   }
      //   if (item.count) {
      //     return {
      //       ...item,
      //       count: isCountExist ? count + 0 : 1,
      //     };
      //   }
      //   return {
      //     ...item,
      //     count: isCountExist || count === 0 ? count + 1 : 1,
      //   };
      // });
      // if (action.payload.type === "bun" && bunCount >= 1) {
      //   return state;
      // }
      // return {
      //   ...state,
      //   data: newData,
      // };
    },
    decreaseCount: (state, action) => {
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
