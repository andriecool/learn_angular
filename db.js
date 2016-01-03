/**
 * Created by andri on 1/3/16.
 */
var express = require('express'),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    router = express('router'),
    conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'learn_angular'
    });


router
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .route('/user')
    .get(function(req, res){
        var limit = req.query.limit ? req.query.limit : 1000;
        var offset = req.query.offset ? req.query.offset : 0;
        conn.query("select * from users limit "+offset+","+limit, function(err, rows){
            if(err) throw(err);
            res.json(rows);
        });
    })
    .post(function(req, res){
        conn.query('insert into users set ?', req.body, function(err, result){
            if(err) throw err;
            result.data = req.body;
            res.json(result);
        });
    });

router
    .route('/user/:id')
    .get(function(req, res){
        conn.query('select * from users where userId = ?', req.params.id, function(err, rows){
            res.json(rows[0]);
        })
    })
    .put(function(req, res){
        conn.query('update users set ? where userId = '+req.params.id, req.body, function(err, result){
            result.data = req.body;
            res.json(result);
        })
    })
    .delete(function(req, res){
        conn.query('delete from users where userId = ?', req.params.id, function(err, result){
            res.json(result);
        })
    });

module.exports = router;