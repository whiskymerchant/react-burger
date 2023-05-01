import {
	fakeBun,
	fakeIngredient,
	fakeIngredientsReject
} from '../../utils/test-data';
import ingredientSlice, {
	TIngredientsState,
	fetchIngredientsThunk,
	increaseCount
} from './ingredients';

describe('ingredientSlice reducer', () => {
	const initialState: TIngredientsState = {
		data: [],
		isLoading: false,
		error: null
	};

	it('test initial state', () => {
		expect(ingredientSlice(initialState, { type: '' })).toEqual(initialState);
	});

	it('test increaseCount', () => {
		expect(
			ingredientSlice(initialState, {
				payload: fakeIngredient,
				type: increaseCount.type
			})
		).toEqual({
			...initialState
		});
	});

	it('test decreaseCount', () => {
		expect(
			ingredientSlice(initialState, {
				payload: fakeIngredient,
				type: increaseCount.type
			})
		).toEqual(initialState);
	});

	it('test fetchIngredientsThunk fulfilled', () => {
		expect(
			ingredientSlice(initialState, {
				payload: [fakeBun, fakeIngredient],
				type: fetchIngredientsThunk.fulfilled
			})
		).toEqual({
			...initialState,
			data: [fakeBun, fakeIngredient],
			isLoading: false
		});
	});

	it('test fetchIngredientsThunk pending', () => {
		expect(
			ingredientSlice(initialState, {
				type: fetchIngredientsThunk.pending
			})
		).toEqual({
			...initialState,
			isLoading: true,
			error: null
		});
	});

	it('test fetchIngredientsThunk rejected', () => {
		expect(
			ingredientSlice(initialState, {
				payload: fakeIngredientsReject,
				type: fetchIngredientsThunk.rejected
			})
		).toEqual({
			...initialState,
			isLoading: false,
			error: fakeIngredientsReject
		});
	});
});
