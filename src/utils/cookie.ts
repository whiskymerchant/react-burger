type TOptions = Record<string, any> & {
	expires?: number | string | Date;
};

export function getCookie(name: any) {
	const matches = document.cookie.match(
		// eslint-disable-next-line no-useless-escape
		new RegExp(
			'(?:^|; )' +
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
				'=([^;]*)'
		)
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: any, options: TOptions = {}) {
	const props = {
		path: '/',
		...options
	};

	let exp = options.expires;
	if (typeof exp == 'number' && exp) {
		const d = new Date();
		d.setTime(d.getTime() + exp * 1000);
		exp = options.expires = d;
	}
	if (exp && (exp as Date).toUTCString) {
		options.expires = (exp as Date).toUTCString();
	}
	value = encodeURIComponent(value);
	let updatedCookie = name + '=' + value;
	for (const propName in options) {
		updatedCookie += '; ' + propName;
		const propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += '=' + propValue;
		}
	}
	document.cookie = updatedCookie;
}

export const removeCookie = (name: string) => {
	setCookie(name, '');
};
