import { fakeUserInfo, fakeUserInfoReject } from '../../utils/test-data';
import userReducer, {
	authCheck,
	checkUserAuth,
	initialState,
	loginUser,
	registerUser
} from './user';

describe('user reducer', () => {
	it('test initialState', () => {
		expect(userReducer(initialState, { type: '' })).toEqual(initialState);
	});

	it('test authCheck', () => {
		expect(userReducer(initialState, { type: authCheck.type })).toEqual({
			...initialState,
			isAuthChecked: true
		});
	});

	it('test checkUserAuth fulfilled', () => {
		expect(
			userReducer(initialState, {
				payload: fakeUserInfo,
				type: checkUserAuth.fulfilled.type
			})
		).toEqual({
			...initialState,
			data: fakeUserInfo,
			getUserRequest: false
		});
	});

	it('test registerUser fulfilled', () => {
		expect(
			userReducer(initialState, {
				payload: fakeUserInfo,
				type: registerUser.fulfilled.type
			})
		).toEqual({
			...initialState,
			data: fakeUserInfo,
			registerUserRequest: false
		});
	});

	it('test loginUser fulfilled', () => {
		expect(
			userReducer(initialState, {
				payload: fakeUserInfo,
				type: loginUser.fulfilled.type
			})
		).toEqual({
			...initialState,
			data: fakeUserInfo,
			loginUserRequest: false
		});
	});

	it('test checkUserAuth pending', () => {
		expect(
			userReducer(initialState, {
				type: checkUserAuth.pending.type
			})
		).toEqual({
			...initialState,
			checkUserAuthRequest: true,
			checkUserAuthError: null
		});
	});

	it('test registerUser pending', () => {
		expect(
			userReducer(initialState, {
				type: registerUser.pending.type
			})
		).toEqual({
			...initialState,
			registerUserRequest: true,
			registerUserError: null
		});
	});

	it('test loginUser pending', () => {
		expect(
			userReducer(initialState, {
				type: loginUser.pending.type
			})
		).toEqual({
			...initialState,
			loginUserRequest: true,
			loginUserError: null
		});
	});

	it('test checkUserAuth rejected', () => {
		expect(
			userReducer(initialState, {
				payload: fakeUserInfoReject,
				type: checkUserAuth.rejected.type
			})
		).toEqual({
			...initialState,
			checkUserAuthRequest: false,
			checkUserAuthError: fakeUserInfoReject
		});
	});

	it('test registerUser rejected', () => {
		expect(
			userReducer(initialState, {
				payload: fakeUserInfoReject,
				type: registerUser.rejected.type
			})
		).toEqual({
			...initialState,
			registerUserRequest: false,
			registerUserError: fakeUserInfoReject
		});
	});

	it('test loginUser rejected', () => {
		expect(
			userReducer(initialState, {
				payload: fakeUserInfoReject,
				type: loginUser.rejected.type
			})
		).toEqual({
			...initialState,
			loginUserRequest: false,
			loginUserError: fakeUserInfoReject
		});
	});
});
