'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var http = require("http");

var OpenWeatherMapApi = function () {
	function OpenWeatherMapApi(opts) {
		_classCallCheck(this, OpenWeatherMapApi);

		if (!opts.apiKey) {
			throw new Error('api key not specified');
		}

		this.API_KEY = opts.apiKey;
		this.API_URI = 'https://api.openweathermap.org/data/2.5/';
	}

	_createClass(OpenWeatherMapApi, [{
		key: 'getCurrent',
		value: function getCurrent(opts) {
			return this._request('weather', opts);
		}
	}, {
		key: 'getForcast',
		value: function getForcast(opts) {
			return this._request('forcast', opts);
		}
	}, {
		key: '_request',
		value: function _request(requestType, opts) {
			var _this = this;

			return new Promise(function (resolve, reject) {

				var locationString = _this._buildLocationQuery(opts);

				if (!locationString) {
					reject(new Error('location could not be identified'));
				} else {
					http.get('' + _this.API_URI + requestType + '?' + locationString + '&APPID=' + _this.API_KEY, function (res) {
						var contents = "";
						res.on('data', function (data) {
							contents += data;
						});
						res.on('close', function () {
							resolve(contents);
						});
					}).on('error', function (e) {
						reject(e);
					});
				}
			});
		}
	}, {
		key: '_buildLocationQuery',
		value: function _buildLocationQuery(opts) {
			//prioritise lng,lat pairs
			if (opts.lng && opts.lat) {
				return 'lat=' + opts.lat + '&lon=' + opts.lng;
				//then post code (with optional country code)
			} else if (opts.postalCode) {
				return 'zip=' + opts.postalCode + (opts.countryCode ? ',' + opts.countryCode : '');
				//then place name (with optional country code)
			} else if (opts.cityName) {
				return 'q=' + opts.cityName + (opts.cityName ? ',' + opts.countryCode : '');
			}
		}
	}]);

	return OpenWeatherMapApi;
}();

module.exports = OpenWeatherMapApi;