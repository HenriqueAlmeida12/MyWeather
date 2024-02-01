$(document).ready(function() {
    var app = new Vue({
        el: '#weather-inputid',
        data: {
            lstTemperatures: [],
            useFahrenheit: false
        },
        mounted: function() {
            this.requestWeather();
        },
        methods: {
            requestWeather: function() {
                $.get("http://177.70.248.43:3002/WeatherForecast", (data, status) => {
                    this.lstTemperatures = data;
                });
            }
        }
    });    
})