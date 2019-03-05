const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config');
const transporter = nodemailer.createTransport(config.mailer)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TSOCode' });
});

router.get('/about', function(req,res) {

  res.render('about', { title: 'TSOCode - A platform for pair programming'})
});



router.route('/contact')
  .get( function(req,res, next) {

    res.render('contact', { title: 'TSOCode - A platform for pair programming' });
  })
  .post(function(req, res, next){
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
      res.render('contact', {
         title: 'TSOCode - A platform for pair programming',
          name: req.body.name,
          email: req.body.email,
          message: req.body.message,
          errorMessages: errors
        });

    } else {

      const mailOptions = {
        from: 'TSOCode <no-reply@tsocode.com>',
        to: 'ericgordontso@gmail.com',
        subject: 'You got a new message from a TSOCode user ' + `${req.body.name}` + '🍆💦💦💦',
        text: "from: " + req.body.email + "\n" + req.body.message 
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error)
        }
        res.render('thank', { title: 'TSOCode - A platform for pair programming' });
      });

    }

  });

  router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login to your account' })
  });

  router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Sign Up' })
  });

module.exports = router;
