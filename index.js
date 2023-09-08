const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
require('./route/index')(app);

app.use(function(err, req, res, next) {
    res.status(500).send('Problem occured!');
    console.log(err.stack);
});

var server = app.listen(3000, function(){
    console.log('Listening on 3000');
});