export default (url, method = 'GET', payload, headers) => {
	const options = {
		method: method,
		redirect: 'follow',
		credentials: 'same-origin'
	};

	if (payload instanceof File) {
		const data = new FormData();
		data.append('file', payload);
		options.body = data;
	} else {
		options.headers = new Headers({
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		});

		// Override default headers
		if (headers) {
			const entries = Object.entries(headers);
			entries.forEach(entry => options.headers.set(entry[0], entry[1]));
		}
		options.body = JSON.stringify(payload);
	}

	const request = new Request(url, options);

	return fetch(request).then(response => {
		const contentType = response.headers.get('Content-Type');
		if (contentType && contentType.indexOf('application/json') !== -1) {
			return response.json();
		} else {
			throw { type: 'ContentTypeException', message: 'Expected Content-Type: application/json; was: ' + contentType, status: response.status };
		}
	});
};
