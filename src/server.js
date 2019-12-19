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
  const page = parseInt(req.query.page) || 1
  const startIndex = (page - 1) * 10
  const endIndex = page * 10
  const productList = {}

  if(endIndex < products.length) {
    productList.nextPage = page + 1
  }

  if(startIndex > 0) {
    productList.previousPage = page - 1
  }
  productList.data = products.slice(startIndex, endIndex)
  res.json(productList)
});




app.listen(5000, function () {
    console.log('Dev app listening on port 5000!');
});
