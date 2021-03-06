var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();
var port = 4000;


var con = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '5941633',
  database: 'online_shop'
});

app.use(bodyParser());
app.use('/assets',express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.json({ "shop-api": "1.0" })
})

app.get('/products', function (req, res) {
  con.query('select * from products',function (err , rows) {
  if (err)
   throw err;

  res.json(rows);
});
});

app.get('/categories', function (req, res) {
  con.query('select * from product_categories',function (err , rows) {
  if (err)
   throw err;

  res.json(rows);
});
});

app.get('/customers', function (req, res) {
  con.query('select * from customers where active = 1',function (err , rows) {
  if (err)
   throw err;

  res.json(rows);
});
});

app.put('/rename' , function(req, res ){
  console.log('recived a put on / rename ..')
  res.json('Hallo world');
});

app.put('/activate/:userid' , function(req, res ){
  con.query('update customers set active = ? where id = ?',[req.body.status,req.params.userid],function (err , rows) {
  if (err)
   throw res.json(err);

  console.log(rows);
});
});

app.post('/user' , function(req, res ){

  con.query('insert into customers (firstname, lastname, birthdate, phone, city, street, email, active) values(?,?,?,?,?,?,?,?)',[req.body.firstname, req.body.lastname, req.body.birthdate, req.body.phone, req.body.city, req.body.street, req.body.email, req.body.active],function (err , rows) {
  if (err)
   throw res.json(err.sqlMessage);

  console.log(rows);
});
});

app.put('/user/:userid', function(req, res) {
  
  var sql = 'update customers set ';
  var i =1;
  var bodyLength = Object.keys(req.body).length;
  var values = [];
  for(var field in req.body){
    sql += field + ' ?';
    if(i < bodyLength)
      sql += ',';
    i++;
    values.push(req.body[field] );
  }
  sql += 'where id = ?';
  values.push(req.params.userid );

  con.query(sql,values, function(err, rows) {
    if (err)
      throw res.json(err);
    console.log(rows);
    res.json(rows);
  });
});

app.put('/deleted/:userid' , function(req, res ){
 //var del = JSON.stringify(req.body.deleted);
 var del = 'now()';
 console.log(del);
  con.query('update customers set deleted = now() where id = ?',[req.params.userid],function (err , rows) {
  if (err)
   throw res.json(err);

  console.log(rows);
});
});

console.log('Server runs on port: '+ port);
app.listen(port);
