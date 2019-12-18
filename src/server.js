const express = require('express');
const data = require('./data/home.json')
const products = require('./data/product.js')

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/api/home', (req, res) => {
    res.json(data)
});

app.get('/api/product', (req, res) => {
  const page = req.query.page
  const startIndex = (page - 1) * 10
  const endIndex = page * 10
  const productList = products.slice(startIndex, endIndex)
  res.json(productList)
});


app.listen(5000, function () {
    console.log('Dev app listening on port 5000!');
});
