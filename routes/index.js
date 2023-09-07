var express = require('express');
var router = express.Router();

const db = require("../db/sqlite.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
  const strName = await db.getName("1");
  console.log(strName[0].name);
  res.render('index', { loop: 3 });
});

router.post('/Calc', (req, res) => {
  console.log(req.body);
  res.send('Calc Result')
});

module.exports = router;
