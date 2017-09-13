class OpenWeatherMapApi {
	constructor(opts) {
		if (!opts.apiKey) {
			throw new Error('api key not specified');
		}
		this.API_KEY = opts.apiKey;
	}

	request() {
		console.log("im totally making a request");
	}
}

module.exports = OpenWeatherMapApi;
