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

router.post('/result', async function(req, res) {
  // console.log(req.body);
  const objResult = await calc(req.body);

  console.log(objResult.total_amount);
  res.render('result', {objResult});
  // res.send('Calc Result')
});

module.exports = router;
