import './index.css';

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://free.currencyconverterapi.com/api/v5/'
});

function getCurrencies(){
    axiosInstance.get('currencies')
        .then(response => {
            console.log(response.data);
        })
}