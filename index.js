const express = require('express')
const date = require('date-and-time')
const path = require('path')
var mysql = require('mysql');
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000

var router = express.Router();
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

router.get('/getTime', function(req, res){
	let now = new Date();
	res.json({'datetime' : date.format(now, 'YYYY/MM/DD HH:mm:ss')});
});

//b2632aa46c91e2  :9a689d80.   @us-cdbr-iron-east-01.cleardb.net/heroku_6220126aa0547cc?reconnect=true


var connection = mysql.createConnection({
  host     : 'otmaa16c1i9nwrek.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'cknigijxoonxv3mw',
  password : 'w6yd2p2pq2805iu9',
  database : 'xwwsfos910k2ipxl'
  // ssl: {
  // 	'ca':'cleardbca.pem',
  // 	'cert': 'b9ccd138d0a8a9-cert.pem',
  // 	'key': 'b9ccd138d0a8a9-key.pem'
  // }
});

connection.connect();

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser.json());

app.get('/getusers', function(request, response) {
  
  
  connection.query('SELECT * from users', function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      response.json({'user' : rows});
       
    });
  
}); 

app.post('/register', function(req, res) {
  var sql = 'INSERT INTO users (username) VALUES (';

  console.log('WHATS UP ' + sql + "'" + req.body.username + "')");

  var data = sql + "'" + req.body.username + "')";
  
  connection.query(data, function(err, result) {
  	if (err){
  		console.error(err);
  		res.statusCode = 500;
  		return res.json({ 'status': ['Failed to create user']});
  	}
  	res.json('status" : "true');
  });
});

app.post('/login', function(request, response) {

	username = request.body.username;
	//username = "Albert";
	connection.query("SELECT * from users where username = '"+username+"'", function(err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      resp = {}
      if (rows.length == 0) {
      	resp = {
      		"STATUS": "FAILED",
      		"MESSAGE": "No User exists with this user name"
      	}
      } else {
      	resp = {
      		"STATUS" : "SUCCESS",
      		"USER": rows[0]
      	}
      }
      response.json(resp);
       
    });
}) ;


app.get('/', (req, res) => res.render('pages/index'))
  .use('/api', router)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

