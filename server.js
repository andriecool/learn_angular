var express = require('express');
var api = require('./api');
var db = require('./db');
var app = express();

app
	.use(express.static('./public'))
	.use('/api', api)
    .use('/db', db)
	.get('*', function(req, res){
		res.sendfile('public/main.html');
	})
	.listen(3000);



