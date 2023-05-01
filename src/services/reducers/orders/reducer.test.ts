import { fakeWsOrdersData } from '../../../utils/test-data';
import { TOrderState } from '../feed/reducer';
import { wsMessageOrder } from './actions';
import { ordersReducer } from './reducer';

describe('ordersReducer', () => {
	const initialState: TOrderState = {
		data: null
	};

	it('test initialState', () => {
		expect(ordersReducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('test wsMessageOrder', () => {
		expect(
			ordersReducer(initialState, {
				type: wsMessageOrder.type,
				payload: fakeWsOrdersData
			})
		).toEqual({
			...initialState,
			data: fakeWsOrdersData
		});
	});
});
