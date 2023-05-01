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
		let count;
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

	it('test ingredientSlice fulfilled', () => {
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

	it('test ingredientSlice pending', () => {
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

	it('test ingredientSlice rejected', () => {
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
