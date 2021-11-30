const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/userModel');


// Login router

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // console.log(req.session)
    if(!req.session && !req.session.passport.user){
      throw Error;
    }
    // console.log(res.req.sessionID)
    res.send(res.req.sessionID);
  });

// Logout router
router.get('/logout', function (req, res) {
  console.log("trying to logout....")
  
  req.logout()
  
  res.end('It worked!');
});

module.exports = router;