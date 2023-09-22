var express = require('express');
var router = express.Router();

const db = require("../db/sqlite.js");
const calc = require("../module/calc.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
  const tbProject = await db.getProject("");
  const tbTicket = await db.getTicket("");
  res.render('index', {loop: 3, tbProject, tbTicket});
});

router.get('/log', async function(req, res, next) {
  const tbLog = await db.getLogs();
  res.render('log', {tbLog});
});

router.post('/result', async function(req, res) {
  const objResult = await calc(req.body);
  
  console.log(objResult.total_amount);

  //Log
  var strIP = req.ip;
  if (strIP.includes("::ffff:")) strIP = strIP.replace('::ffff:', '');
  await db.insertLog(strIP, req.body.num_adults, req.body.num_children, req.body.travel_dates, objResult.total_amount);

  res.render('result', {objResult});
  // res.send('Calc Result')
});

module.exports = router;
