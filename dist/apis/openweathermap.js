'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OpenWeatherMapApi = function () {
	function OpenWeatherMapApi(opts) {
		_classCallCheck(this, OpenWeatherMapApi);

		if (!opts.apiKey) {
			throw new Error('api key not specified');
		}
		this.API_KEY = opts.apiKey;
	}

	_createClass(OpenWeatherMapApi, [{
		key: 'request',
		value: function request() {
			require("http").get("https://api.openweathermap.org/data/2.5/weather?q=London", function (res) {
				console.log("here");
				var contents = "";
				res.on('data', function (data) {
					contents += data;
				});
				res.on('close', function () {
					console.log(contents);
				});
			});
		}
	}]);

	return OpenWeatherMapApi;
}();

module.exports = OpenWeatherMapApi;