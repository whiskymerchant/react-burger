import { createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "../../types/ingredientTypes";

export type TCurrentIngredient = TIngredient | null;

const initialState: TCurrentIngredient = null;

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    openModal: (state, action) => {
      return action.payload;
    },
    closeModal: (state, action) => {
      return null;
    },
  },
});

export const { openModal, closeModal } = ingredientSlice.actions;
export default ingredientSlice.reducer;
