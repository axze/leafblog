var express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.engine('hbs', exphbs({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true
}));

app.use('/', require('./routes/index'));

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Server listening on port ", port);
