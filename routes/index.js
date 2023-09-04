var express = require('express');
var router = express.Router();

const db = require("../db/sqlite.js");

/* GET home page. */
router.get('/', async function(req, res, next) {
  const strName = await db.getName("1");
  console.log(strName[0].name);
  res.render('index', { title: strName[0].name });
});

module.exports = router;
