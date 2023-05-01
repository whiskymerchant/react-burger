import ingredientSlice, {
	TCurrentIngredient,
	closeModal,
	openModal
} from './currentIngredient';

describe('ingredientSlice reducer', () => {
	const initialState: TCurrentIngredient = null;

	it('test initial state', () => {
		expect(ingredientSlice(initialState, { type: '' })).toEqual(initialState);
	});

	it('test openModal', () => {
		expect(
			ingredientSlice(initialState, {
				type: openModal.type
			})
		).toEqual(initialState);
	});

	it('test closeModal', () => {
		expect(
			ingredientSlice(initialState, {
				type: closeModal.type
			})
		).toEqual(initialState);
	});
});
