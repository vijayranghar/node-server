var express = require('express');
var request = require("request");

var app = express();

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


app.listen(5000, function () {
    console.log('Dev app listening on port 5000!');
});