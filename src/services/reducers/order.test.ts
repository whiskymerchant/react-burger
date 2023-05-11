import { fakeOrder } from '../../utils/test-data';
import { fetchOrderSlice, initialState, orderSlice } from './order';

describe('burgerOrderInfoSlice reducer', () => {
	it('test initial state', () => {
		expect(orderSlice.reducer(initialState, { type: '' })).toEqual(
			initialState
		);
	});

	it('test fetchOrderSlice fulfilled', () => {
		expect(
			orderSlice.reducer(initialState, {
				payload: fakeOrder,
				type: fetchOrderSlice.fulfilled
			})
		).toEqual({ ...initialState, isLoading: false, data: fakeOrder });
	});

	it('test fetchOrderSlice pending', () => {
		expect(
			orderSlice.reducer(initialState, {
				payload: fakeOrder,
				type: fetchOrderSlice.pending
			})
		).toEqual({ ...initialState, isLoading: true, error: false });
	});

	it('test fetchOrderSlice rejected', () => {
		expect(
			orderSlice.reducer(initialState, {
				payload: fakeOrder,
				type: fetchOrderSlice.rejected
			})
		).toEqual({ ...initialState, isLoading: false, error: fakeOrder });
	});
});
