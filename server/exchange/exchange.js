const axios = require('axios');

const app_id = "8f9651cea59742f696ef1be124c98f8a";

const getLatestRate = async(currency) => {
    try{
        const res = await axios.get(`http://api.fixer.io/latest?base=${currency}`);
        return res.data.rates;
    }catch(e){
        throw new Error(`Unable to get latest exchange rate for ${currency}`);
    }
};

const getExchangeRate = async (from, to) => {
    try{
        const res = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        const rate = res.data.rates[to];
        if(rate){
            return rate;
        }else{
            throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
        }
    }catch(e){
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }
}

const getHistoricalRate = async (date) => {
    try{
        const res = await axios.get(`http://api.fixer.io/${date}`);
        return res.data.rates;
    }catch(e){
        throw new Error(`Unable to get exchange rate in ${date}`);
    }
}

const getCurrencyName = async (currency) => {
    try{
        const res = await axios.get(`https://openexchangerates.org/api/currencies.json?app_id=${app_id}`);
        return res.data[currency];
    }catch (e){
        throw new Error(`Could not find name of ${currency}`);
    }
}

module.exports = {
    getLatestRate,
    getExchangeRate,
    getHistoricalRate,
    getCurrencyName
}