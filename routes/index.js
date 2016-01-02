var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var db = require('../models/db.js');

router.get('/', function(req, res) {
  db.getPosts(function(result) {
    res.render('index', {data: result});
  });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  db.getUser(email, function(data) {
    var dbPassword = data[0].password;
    bcrypt.compare(password, dbPassword, function(err, res2) {
      if(res2) {
        var session = req.session;
        session.user = data[0].id;
        res.redirect('/dashboard');
      }else{
        res.send('failed');
      }
    });
  });
});

router.get('/dashboard', isAuthenticated, function(req, res) {
  res.render('dashboard', {id: req.session.user});
});

router.post('/dashboard', isAuthenticated, function(req, res) {
  var title = req.body.title;
  var body = req.body.body;
  var tags = req.body.tags;
  var owner = req.session.user;
  db.createPost(title, body, tags, owner, function(result) {
    res.send(result);
  });
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

function isAuthenticated(req, res, next) {
  if(req.session.user)
    return next();

  res.redirect('/');
}

module.exports = router;
