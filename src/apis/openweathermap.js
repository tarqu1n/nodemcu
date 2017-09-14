'use strict';

const http = require("http");

class OpenWeatherMapApi {
	constructor(opts) {
		if (!opts.apiKey) {
			throw new Error('api key not specified');
		}

		this.API_KEY = opts.apiKey;
		this.API_URI = 'https://api.openweathermap.org/data/2.5/';
	}

	getCurrent(opts) {
		return this._request('weather', opts);
	}

	getForcast(opts) {
		return this._request('forcast', opts);
	}

	_request(requestType, opts) {
		return new Promise((resolve, reject) => {

			let locationString = this._buildLocationQuery(opts);

			if (!locationString){
				reject(new Error('location could not be identified'));
			}else{
				http.get(`${this.API_URI}${requestType}?${locationString}&APPID=${this.API_KEY}`, res => {
					let contents = "";
					res.on('data', data => { contents += data; });
					res.on('close', () => {	resolve(contents); });
				}).on('error', e => { reject(e); });
			}
		});
	}

	_buildLocationQuery(opts) {
		//prioritise lng,lat pairs
		if (opts.lng && opts.lat){
			return `lat=${opts.lat}&lon=${opts.lng}`;
		//then post code (with optional country code)
		}else if (opts.postalCode){
			return `zip=${opts.postalCode}` + (opts.countryCode ? `,${opts.countryCode}` : '');
		//then place name (with optional country code)
		}else if (opts.cityName){
			return `q=${opts.cityName}` + (opts.cityName ? `,${opts.countryCode}` : '');
		}
	}
}

module.exports = OpenWeatherMapApi;
