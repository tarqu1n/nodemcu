'use strict';

class OpenWeatherMapApi {
	constructor(opts) {
		if (!opts.apiKey) {
			throw new Error('api key not specified');
		}
		this.API_KEY = opts.apiKey;
	}

	request() {
		require("https").get("https://api.openweathermap.org/data/2.5/weather?q=London", function(res) {
			console.log("here");
			var contents = "";
			res.on('data', function(data) {
				contents += data;
			});
			res.on('close', function() {
				console.log(contents);
			});
		});
	}
}

module.exports = OpenWeatherMapApi;
