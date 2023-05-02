import { fakeBun, fakeIngredient } from '../../utils/test-data';
import constructorSlice, {
	addConstructor,
	initialState,
	removeConstructor
} from './constructor';

describe('constructorSlice', () => {
	it('test ConstructorSlice', () => {
		expect(
			constructorSlice(initialState, {
				type: addConstructor.type,
				payload: fakeBun
			})
		).toEqual({
			...initialState,
			bun: { ...fakeBun, id: expect.stringMatching('') }
		});
	});

	it('test addConstructor else', () => {
		expect(
			constructorSlice(initialState, {
				type: addConstructor.type,
				payload: fakeIngredient
			})
		).toEqual({
			...initialState,
			ingredients: [{ ...fakeIngredient, id: expect.stringMatching('') }]
		});
	});
	it('test removeConstructor', () => {
		const fakeID = 'klngfjk1984123jkbsdf8t1rgxdfjkgvb983';
		expect(
			constructorSlice(
				{ ...initialState, ingredients: [{ ...fakeIngredient, id: fakeID }] },
				{
					type: removeConstructor.type,
					payload: fakeID
				}
			)
		).toEqual(initialState);
	});
});
