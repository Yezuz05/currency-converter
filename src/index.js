import './index.css';

import Vue from 'vue';
import axios from 'axios';

import Toast from './toast';

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
        this.registerServiceWorker();
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
        },
        registerServiceWorker() {
            if (!navigator.serviceWorker) return;
                navigator.serviceWorker.register('./sw.js').then(reg => {
                    if (!navigator.serviceWorker.controller) {
                        return;
                      }
                  
                      if (reg.waiting) {
                        this.updateReady(reg.waiting);
                        return;
                      }
                  
                      if (reg.installing) {
                        this.trackInstalling(reg.installing);
                        return;
                      }
                  
                      reg.addEventListener('updatefound', function() {
                        this.trackInstalling(reg.installing);
                      });
                })
                let refreshing;
                navigator.serviceWorker.addEventListener('controllerchange', function() {
                  if (refreshing) return;
                  window.location.reload();
                  refreshing = true;
                });
        },
        updateReady(worker) {      
            new Toast({
                message: 'There is a new version of the app',
                type: 'info',
                customButtons: [
                {
                    text: 'Install',
                    onClick: function() {
                        worker.postMessage({action: 'skipWaiting'});
                    }
                }
                ]
            });
        },
        trackInstalling(worker) {
            worker.addEventListener('statechange', function() {
                if (worker.state == 'installed') {
                  this.updateReady(worker);
                }
              });
        }
    }
})




new Toast({
    message: 'This is an example with custom buttons',
    type: 'success',
    customButtons: [
      {
        text: 'Refresh the page',
        onClick: function() {
          window.location.reload();
        }
      },
      {
        text: 'Follow @ireaderinokun',
        onClick: function() {
          window.open('https://twitter.com/ireaderinokun');
        }
      }
    ]
  });