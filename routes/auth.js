const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login to your account' })
});

router.route('/register')
  .get(function (req, res, next) {
    res.render('register', { title: 'Sign Up' })
  })
  .post(function(req, res, next) {
    req.checkBody('name', 'Empty Name').notEmpty();
    req.checkBody('email', 'Empty email').isEmail();
    req.checkBody('password', 'Empty password').notEmpty();
    req.checkBody('password', 'Passwords does not match').equals(req.body.confirmPassword).notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      res.render('register', {
        name: req.body.name,
        email: req.body.email,
        errorMessages: errors
      });
    } else {
      var user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.setPassword(req.body.password);
      user.save(function (err) {
        if (err){
          res.render('register', { errorMessages: err});
        } else {
          res.redirect('/login');
        }
      })
    }
  });


module.exports = router;