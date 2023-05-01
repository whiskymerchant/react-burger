export const fakeWsOrdersData = {
	success: true,
	orders: [
		{
			_id: '644e739645c6f2001be6f42a',
			ingredients: [
				'643d69a5c3f7b9001cfa093c',
				'643d69a5c3f7b9001cfa0943',
				'643d69a5c3f7b9001cfa093c'
			],
			status: 'done',
			name: 'Space краторный бургер',
			createdAt: '2023-04-30T13:56:38.993Z',
			updatedAt: '2023-04-30T13:56:39.071Z',
			number: 2388
		},
		{
			_id: '644e73ad45c6f2001be6f42c',
			ingredients: [
				'643d69a5c3f7b9001cfa093c',
				'643d69a5c3f7b9001cfa0942',
				'643d69a5c3f7b9001cfa093c'
			],
			status: 'done',
			name: 'Краторный spicy бургер',
			createdAt: '2023-04-30T13:57:01.152Z',
			updatedAt: '2023-04-30T13:57:01.195Z',
			number: 2389
		},
		{
			_id: '644e73c645c6f2001be6f42e',
			ingredients: [
				'643d69a5c3f7b9001cfa093c',
				'643d69a5c3f7b9001cfa0942',
				'643d69a5c3f7b9001cfa093c'
			],
			status: 'done',
			name: 'Краторный spicy бургер',
			createdAt: '2023-04-30T13:57:26.768Z',
			updatedAt: '2023-04-30T13:57:26.872Z',
			number: 2390
		},
		{
			_id: '644e742945c6f2001be6f433',
			ingredients: [
				'643d69a5c3f7b9001cfa093c',
				'643d69a5c3f7b9001cfa0942',
				'643d69a5c3f7b9001cfa093c'
			],
			status: 'done',
			name: 'Краторный spicy бургер',
			createdAt: '2023-04-30T13:59:05.231Z',
			updatedAt: '2023-04-30T13:59:05.272Z',
			number: 2391
		}
	],
	total: 2024,
	totalToday: 201
};

export const fakeBun = {
	_id: '643d69a5c3f7b9001cfa093c',
	name: 'Краторная булка N-200i',
	type: 'bun',
	proteins: 80,
	fat: 24,
	carbohydrates: 53,
	calories: 420,
	price: 1255,
	image: 'https://code.s3.yandex.net/react/code/bun-02.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
	__v: 0
};

export const fakeIngredient = {
	_id: '643d69a5c3f7b9001cfa093e',
	name: 'Филе Люминесцентного тетраодонтимформа',
	type: 'main',
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: 'https://code.s3.yandex.net/react/code/meat-03.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
	__v: 0
};

export const fakeUserInfo = {
	email: 'email@email.email',
	name: 'name name'
};

export const fakeUserInfoReject = {
	type: 'user/reduceName/rejected',
	meta: {
		arg: {
			dataUser: {
				email: 'email@email.email',
				name: 'name name'
			}
		},
		requestId: 'someID',
		rejectedWithValue: false,
		requestStatus: 'rejected',
		aborted: false,
		condition: false
	},
	error: {
		message: 'Rejected'
	}
};

export const fakeOrder = {
	success: true,
	name: 'Астероидный флюоресцентный бургер',
	order: {
		ingredients: [
			{
				_id: '643d69a5c3f7b9001cfa093d',
				name: 'Флюоресцентная булка R2-D3',
				type: 'bun',
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: 'https://code.s3.yandex.net/react/code/bun-01.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
				__v: 0
			},
			{
				_id: '643d69a5c3f7b9001cfa094a',
				name: 'Сыр с астероидной плесенью',
				type: 'main',
				proteins: 84,
				fat: 48,
				carbohydrates: 420,
				calories: 3377,
				price: 4142,
				image: 'https://code.s3.yandex.net/react/code/cheese.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
				__v: 0
			},
			{
				_id: '643d69a5c3f7b9001cfa093d',
				name: 'Флюоресцентная булка R2-D3',
				type: 'bun',
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: 'https://code.s3.yandex.net/react/code/bun-01.png',
				image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
				image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
				__v: 0
			}
		],
		_id: '644ea41e45c6f2001be6f4f2',
		owner: {
			name: 'name name',
			email: 'email@email.email',
			createdAt: '2023-04-30T13:47:22.766Z',
			updatedAt: '2023-04-30T13:47:22.766Z'
		},
		status: 'done',
		name: 'Астероидный флюоресцентный бургер',
		createdAt: '2023-04-30T17:23:42.899Z',
		updatedAt: '2023-04-30T17:23:42.971Z',
		number: 2424,
		price: 6118
	}
};

export const fakeIngredientsReject = {
	type: 'ingredients/fetchIngredientsThunk/rejected',
	meta: {
		requestId: 'dKwt6QIJ46dpbw5uh0t1w',
		rejectedWithValue: false,
		requestStatus: 'rejected',
		aborted: false,
		condition: false
	},
	error: {
		name: 'SyntaxError',
		message: 'Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON',
		stack:
			'SyntaxError: Unexpected token \'<\', "<!DOCTYPE "... is not valid JSON'
	}
};
