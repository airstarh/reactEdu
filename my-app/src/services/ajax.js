export class Ajax {
	url         = 'http://alinazero/alinaRestAccept?cmd=model&m=user&ps=2&p=1';
	headers     = {
		"Content-Type": "application/json; charset=utf-8",
		// "Content-Type": "application/x-www-form-urlencoded",
	};
	getParams   = {};
	postParams  = {};
	mode        = "cors"; // no-cors, cors, *same-origin
	cache       = "no-cache"; // *default, no-cache, reload, force-cache, only-if-cached
	credentials = "omit"; //"same-origin"; // include, same-origin, *omit
	redirect    = "follow"; // manual, *follow, error
	referrer    = "no-referrer"; // no-referrer, *client

	constructor(options) {
		options.url && (this.url = options.url);
		options.headers && Object.assign(this.headers, options.headers);
		options.getParams && Object.assign(this.getParams, options.getParams);
		options.postParams && Object.assign(this.postParams, options.postParams);

		this.url = new URL(this.url);
		Object.keys(this.getParams).forEach(key => this.url.searchParams.append(key, this.getParams[key]))
	}

	get() {
		return fetch(this.url, {
			method:      "GET", // *GET, POST, PUT, DELETE, etc.
			mode:        this.mode,
			cache:       this.cache,
			credentials: this.credentials,
			headers:     this.headers,
			redirect:    this.redirect,
			referrer:    this.referrer,
		})
			.then(response => response.json()) // parses response to JSON
			.catch(error => console.error('Error:', error));

	};

	post() {
		return fetch(this.url, {
			method:      "POST", // *GET, POST, PUT, DELETE, etc.
			mode:        this.mode,
			cache:       this.cache,
			credentials: this.credentials,
			headers:     this.headers,
			redirect:    this.redirect,
			referrer:    this.referrer,
			body:        JSON.stringify(this.postParams)
		})
			.then(response => response.json()) // parses response to JSON
			.catch(error => console.error('Error:', error));
	};

	put() {
	};

	delete() {
	};
}