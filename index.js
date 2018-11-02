const express = require('express')
const date = require('date-and-time')
const path = require('path')
const PORT = process.env.PORT || 5000

var router = express.Router();

router.get('/getTime', function(req, res){
	let now = new Date();
	res.json({'datetime' : date.format(now, 'YYYY/MM/DD HH:mm:ss')});
});




var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .use('/api', router)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

