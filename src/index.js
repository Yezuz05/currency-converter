import './index.css';

import Vue from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://free.currencyconverterapi.com/api/v5/'
});


const app = new Vue({
    el: '#app',
    data: {
        currencies: null,
        fromCurr: {
            countryName: '',
            id: ''
        },
        toCurr: {
            countryName: '',
            id: ''
        },
        fromVal: 1,
        toVal: 1
    },
    mounted() {
        this.getCurrencies();
    },
    methods: {
        getCurrencies: function() {
            const self = this;
            axiosInstance.get('currencies')
                .then(response => {
                    self.currencies = Object.values(response.data.results);
                    this.fromCurr = self.currencies[0];
                    this.toCurr = self.currencies[0];
                })
        },
        convert: function(reverse = false) {
            const conversionString = `${this.fromCurr.id}_${this.toCurr.id}`;
            const reverseConversionString = `${this.toCurr.id}_${this.fromCurr.id}`;

            axiosInstance.get('convert', {
                    params: {
                        q: `${conversionString},${reverseConversionString}`,
                        compact: 'ultra'
                    }
                })
                .then(response => {
                    const self = this;
                    let result;
                    switch (reverse) {
                        case false:
                            result = self.fromVal * response.data[conversionString]
                            self.toVal = result.toFixed(2);
                            break;
                        case true:
                            result = self.toVal * response.data[reverseConversionString]
                            self.fromVal = result.toFixed(2);
                            break;
                    }
                })
        }
    }
})