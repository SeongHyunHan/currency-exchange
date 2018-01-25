// Built-in Package
const http = require('http');
// Internal Package
const {getLatestRate, getExchangeRate} = require('./exchange/exchange');
const {calculate} = require('./exchange/calc');
// External Package
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/getLatestRate', (req, res) => {
    var currency = req.body.currency;
    getLatestRate(`${currency}`).then((rates) => {
        res.send(rates);  
    }).catch((e) => {
        res.status(400).send();
    });
});

app.post('/getExchangeRate', (req, res) => {
    var from = req.body.from;
    var to = req.body.to;
    var amount = req.body.amount;
    
    getExchangeRate(from, to).then((rate) =>{
        var exchangedAmount = calculate(amount, rate);
        var result = {
            rate,
            exchangedAmount
        };

        res.send(result);
    });
    
});

app.listen(port, () => {
    console.log(`Server started at : ${port}`);
})