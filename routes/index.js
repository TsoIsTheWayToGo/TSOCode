var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TSOCode' });
});

router.get('/about', function(req,res) {

  res.render('about', { Title: 'TSOCode - A platform for pair programming'})
});
router.get('/contact', function(req,res) {

  res.render('contact', { Title: 'TSOCode - A platform for pair programming'})
});

module.exports = router;
