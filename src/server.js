const express = require('express');
const homepageInfo = require('./data/homepageInfo.js')
const products = require('./data/product.js')
const description = require('./data/productDescription')

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/api/home', (req, res) => {
    res.json(homepageInfo)
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id
  const name = `Product ${id}`
  const rating = Math.floor(Math.random()*5) + 1
  const price = `Rs ${Math.floor(Math.random()*3000) + 100}`
  const productDescription = {...description, id, rating, price, name}
  res.json(productDescription)
})

app.get('/api/products', (req, res) => {
  const pageId = parseInt(req.query.page) || 1
  const startIndex = (pageId - 1) * 10
  const endIndex = pageId * 10
  const productList = {}

  if ((endIndex > 0) && (endIndex < products.length)) {
    productList.nextPage = pageId + 1
  } else {
    productList.nextPage = 2
  }

  if ((startIndex > 0) && (startIndex < products.length)) {
    productList.previousPage = pageId - 1
  }

  productList.data = products.slice(startIndex, endIndex)
  res.json(productList)
});




app.listen(process.env.PORT || 5000, function () {
    console.log('Dev app listening on port 5000!');
});
