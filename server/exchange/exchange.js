const axios = require('axios');

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

module.exports = {
    getLatestRate,
    getExchangeRate
}