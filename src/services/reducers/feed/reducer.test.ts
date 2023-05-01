import { fakeWsOrdersData } from '../../../utils/test-data';
import { wsMessageFeed } from './actions';
import { TOrderState, feedReducer } from './reducer';

describe('feedReducer', () => {
	const initialState: TOrderState = {
		data: null
	};

	it('test initialState', () => {
		expect(feedReducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('test wsMessageFeed', () => {
		expect(
			feedReducer(initialState, {
				type: wsMessageFeed.type,
				payload: fakeWsOrdersData
			})
		).toEqual({
			...initialState,
			data: fakeWsOrdersData
		});
	});
});
