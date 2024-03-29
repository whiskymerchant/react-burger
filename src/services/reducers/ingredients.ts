import { createSlice, createAsyncThunk, CaseReducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from '../../utils/api';
import { TIngredient } from '../../types/ingredientTypes';

export type TIngredientsState = {
	data: TIngredient[];
	isLoading: boolean;
	error: null | string;
};

export const initialState: TIngredientsState = {
	data: [],
	isLoading: false,
	error: null
};

export const fetchIngredientsThunk = createAsyncThunk(
	'ingredients/fetchIngredientsThunk',
	async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
		const data = await getIngredients();
		if (!data) {
			return rejectWithValue('Server error');
		}
		return data;
	}
);

export const ingredientSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		increaseCount: (
			state,
			action: PayloadAction<Pick<TIngredient, '_id' | 'type'>>
		) => {
			const currentIngredientId = action.payload._id;
			const currentIngredientType = action.payload.type;
			const newData = state.data.map((ingredient) => {
				let count;
				if (ingredient.type === 'bun' && currentIngredientType === 'bun') {
					count = null; // changed to null instead of 0
				}
				if (ingredient._id === currentIngredientId) {
					if (ingredient.type === 'bun') {
						count = 2;
					} else {
						count = ingredient.count ? ingredient.count + 1 : 1;
					}
				} else {
					if (ingredient.type === 'bun') {
						count = 0;
					}
				}
				const result =
					ingredient._id === currentIngredientId
						? {
								...ingredient,
								count: count
						  }
						: ingredient;
				return result;
			});

			return { ...state, data: newData };
		},
		decreaseCount: (state, action: PayloadAction<TIngredient['_id']>) => {
			return {
				...state,
				data: state.data.map((item) => {
					const { count, _id } = item;
					if (_id !== action.payload) {
						return item;
					}
					const isCountExsit = typeof count === 'number';
					const isCountPositive = isCountExsit && count > 1;
					return {
						...item,
						count: isCountPositive ? count - 1 : null
					};
				})
			};
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchIngredientsThunk.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchIngredientsThunk.rejected, (state, action) => {
				state.error = action.payload as TIngredientsState['error'];
				state.isLoading = false;
			});
	}
});

export const { increaseCount, decreaseCount } = ingredientSlice.actions;

export default ingredientSlice.reducer;
