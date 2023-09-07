var express = require('express');
var router = express.Router();

const db = require("../db/sqlite.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
  const tbProject = await db.getProject("");
  const tbTicket = await db.getTicket("");
  res.render('index', {loop: 3, tbProject, tbTicket});
});

router.post('/Calc', (req, res) => {
  console.log(req.body);
  res.send('Calc Result')
});

module.exports = router;
