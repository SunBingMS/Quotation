var express = require('express');
var router = express.Router();

const db = require("../db/sqlite.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {err: ""});
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/login', async function(req, res) {
  let {account, password} = req.body;
  const tbUser = await db.getUser(account.trim(), password.trim());

  if (tbUser.length == 0) {
    res.render('login', {err: "Failed: incorrect username or password!"});
    return;
  }

  req.session.user = req.body.account;
  req.session.isLogin = true;

  //res.render('result', {objResult});
  res.redirect('/index')
});

function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else res.redirect('/')
};

module.exports = router;
