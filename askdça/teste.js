$(document).ready(function () {
    var app = new Vue({
        el: '#app',
        data: {
            lstTemperatures: [],
            useFahrenheit: false,
            userTemperature: {}
        },
        mounted: function () {
            this.requestWeather();
            this.findGeo();
        },
        methods: {
            requestWeather: function () {
                $.get("http://177.70.248.43:3002/WeatherForecast", (data, status) => {
                    this.lstTemperatures = data;
                });
            },
            findGeo: function () {
                const successCallback = (position) => {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;

                    $.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD7V5yBfCHhUv2ONFsSOQH3g2eL8lmlAwU`, (data, status) => {
                        let x = data.results[5];
                        $.get(`http://api.weatherapi.com/v1/current.json?key=74390f9162f24f94b9414250240202&q=${x.formatted_address}&aqi=no`, (data, status) => {
                            let z = data.current;
                            let lastupdate = z.last_updated;
                            let temperature_C = z.feelslike_c
                            let temperature_F = z.feelslike_f
                            let summary_text = z.condition.text;
                            let newTemperature = { date: lastupdate, temperatureC: temperature_C, temperatureF: temperature_F, summary: summary_text, userLocation: data.location.country }
                            this.userTemperature = newTemperature;
                        });
                    });
                };

                const errorCallback = (error) => {
                    console.log(error);
                };

                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            },
            changeTemperature: function () {
                this.useFahrenheit = !this.useFahrenheit;
            }
        }
    });
});