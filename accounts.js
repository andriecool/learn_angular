var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    crypto = require('crypto'),
    mysql = require('mysql');

var router = express.Router(),
    conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'learn_angular'
    });

function hash(password){
    return crypto.createHash('sha256').update(password).digest('hex');
}

router
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(session({
        secret: 'iowlejkdlaknsaldkjsalajdklsajqwoeiowquoeqlkasnlakfjaljf',
        resave: true,
        saveUninitialized: true
    }))
    //.use(function(req, res, next){
    //    if(req.session.userId){
    //        conn.query("select * from accounts where id = ?", req.session.userId, function(err, rows){
    //            req.user = rows[0];
    //        });
    //    }
    //    next();
    //})
    .get('/login', function(req, res){
        res.sendfile('public/login.html');
        //res.send("AHA")
    })
    .post('/login', function(req, res){
        var user = {
            username: req.body.username,
            password: hash(req.body.password)
        }
        conn.query("select * from accounts where username = '"+user.username+"' and password = '"+user.password+"'", user, function(err, rows){
            if(err) throw err;
            req.session.userId = rows[0].id;
            req.user = rows[0];
            res.redirect('/');
            //res.send("LOGGED IN");
        });
    })
    .post('/register', function(req, res){
        var user = {
            username: req.body.username,
            password: hash(req.body.password)
        };
        conn.query("select * from accounts where username = ?", user.username, function(err, rows){
            if(!rows.length){
                conn.query("insert into accounts set ?", user, function(err, result){
                    res.send(result);
                    res.redirect('/login');
                })
            } else {
                res.send('Username has been used, please pick another one.')
            }
        })

    })
    .get('/logout', function(req, res){
        req.session.userId = null;
        res.redirect('/');
    });

module.exports = router;