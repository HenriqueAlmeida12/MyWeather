document.addEventListener('DOMContentLoaded', function () {
    swiper = new Swiper('.swiper', {
        speed: 400,
        spaceBetween: 100,
        slidesPerView: 3,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

const app = Vue.createApp({
    data() {
        return {
            lstTemperatures: [],
            useFahrenheit: false,
            userTemperature: {},
            userLocation: '',
            useSearch: false,
            imgUrl: ''
        }
    },

    methods: {
        requestWeather: function () {
            fetch('https://musinx.duckdns.org:3002/WeatherForecast').then(response =>
                response.text()).then(data => {
                    data = JSON.parse(data);
                    data.forEach(a => {
                        const parsedDate = new Date(a.date);
                        a.date = parsedDate.toLocaleDateString('en-US', { weekday: 'long' });
                    });
                    this.userTemperature = data[0];
                    data.shift();
                    this.lstTemperatures = data;
                });
        },
        findGeo: function () {
            fetch('https://musinx.duckdns.org:3002/LocalWeather').then(response => response.text()).then(data => {
                this.userLocation = data;
                console.log(data);
            });
        },
        changeTemperature: function () {
            this.useFahrenheit = !this.useFahrenheit;
        },
        changeSearch: function () {
            this.useSearch = this.useSearch === false ? true : false;
        },
        checkTimeDay: function() {
            let date = new Date();
            if (date.getHours() < 5 || date.getHours() > 18) {
                this.imgUrl = 'assets/luna.png';
            } else{
                this.imgUrl = '/assets/sunny.png';
            }
        }
    },

    beforeMount() {
        this.checkTimeDay();
        this.requestWeather();
        this.findGeo();
    }
})

app.mount('#app');