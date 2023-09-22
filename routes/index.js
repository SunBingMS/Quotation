var express = require('express');
var router = express.Router();

const db = require("../db/sqlite.js");
const calc = require("../module/calc.js");

router.get('/index', isAuthenticated, async function(req, res, next) {
  const tbProject = await db.getProject("");
  const tbTicket = await db.getTicket("");
  res.render('index', {loop: 3, tbProject, tbTicket});
});

router.get('/log', async function(req, res, next) {
  const tbLog = await db.getLogs();
  res.render('log', {tbLog});
});

router.post('/result', isAuthenticated, async function(req, res) {
  const objResult = await calc(req.body);

  console.log(objResult.total_amount);

  //Log
  var strIP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
  if (strIP.includes("::ffff:")) strIP = strIP.replace('::ffff:', '');
  await db.insertLog(strIP, req.body.num_adults, req.body.num_children, req.body.travel_dates, objResult.total_amount);

  res.render('result', {objResult});
  // res.send('Calc Result')
});

function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else res.redirect('/')
};

module.exports = router;
