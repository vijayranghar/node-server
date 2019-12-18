var express = require('express');
var request = require("request");
var bodyParser =   require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/api', function (req, res) {
    request({
        uri: "https://ace.tokopedia.com/search/v1/product/by_id?device=web&rows=5&source=im&id=" + req.query.id,
        method: "GET",
        timeout: 10000
    }, function(err, response, body) {
        res.send(body)
    })
});

app.post('/api', function(req, res) {
    console.log('req.body is', req.body);
    res.send('OK');
})


app.listen(5000, function () {
    console.log('Dev app listening on port 5000!');
});