var express = require('express');
var accounts = require('./accounts');
var api = require('./api');
var db = require('./db');
var app = express();

app
	.use(express.static('./public'))
    .use(accounts)
	.use('/api', api)
    .use('/db', db)
	.get('*', function(req, res){
        if(!req.session.userId){
            //res.send(req.user);
            res.redirect('/login');
        } else {
            res.sendFile('public/main.html', {root: '.'});
        }
	})
	.listen(3000);



