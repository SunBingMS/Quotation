var express = require('express');
var router = express.Router();

const db = require("../db/sqlite.js");
const calc = require("../module/calc.js");
const sendmail = require("../module/sendmail.js");

router.get('/index', isAuthenticated, async function (req, res, next) {
  const tbProject = await db.getProject("");
  const tbTicket = await db.getTicket("");

  //Log
  var strIP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
  if (strIP.includes("::ffff:")) strIP = strIP.replace('::ffff:', '');
  var objReq = {
    num_adults: '0',
    num_children: '0',
    travel_dates: '0',
    days: []
  };
  await db.insertLoginLog(strIP, objReq, '0');

  res.render('index', { loop: 3, tbProject, tbTicket });
});

router.get('/log', async function (req, res, next) {
  const tbLog = await db.getLogs();
  res.render('log', { tbLog });
});

router.post('/result', isAuthenticated, async function (req, res) {
  var objReq = {
    num_adults: parseInt(req.body.num_adults),
    num_children: parseInt(req.body.num_children),
    travel_dates: parseInt(req.body.travel_dates),
    days: [
      {
        ck_guide: req.body.D1_ck_guide,
        ck_lunch: req.body.D1_ck_lunch,
        ck_dinner: req.body.D1_ck_dinner,
        ck_car: req.body.D1_ck_car,
        br_car: req.body.D1_br_car,
        ck_hotel: req.body.D1_ck_hotel,
        br_area: req.body.D1_br_area,
        br_hotel: req.body.D1_br_hotel,
        ck_experiences: req.body.D1_ck_experiences,
        dd_experiences: req.body.D1_dd_experiences,
        ck_ticket: req.body.D1_ck_ticket,
        dd_ticket: req.body.D1_dd_ticket,
        num_other: parseFloat(req.body.D1_num_other) || 0
      },
      {
        ck_guide: req.body.D2_ck_guide,
        ck_lunch: req.body.D2_ck_lunch,
        ck_dinner: req.body.D2_ck_dinner,
        ck_car: req.body.D2_ck_car,
        br_car: req.body.D2_br_car,
        ck_hotel: req.body.D2_ck_hotel,
        br_area: req.body.D2_br_area,
        br_hotel: req.body.D2_br_hotel,
        ck_experiences: req.body.D2_ck_experiences,
        dd_experiences: req.body.D2_dd_experiences,
        ck_ticket: req.body.D2_ck_ticket,
        dd_ticket: req.body.D2_dd_ticket,
        num_other: parseFloat(req.body.D2_num_other) || 0
      },
      {
        ck_guide: req.body.D3_ck_guide,
        ck_lunch: req.body.D3_ck_lunch,
        ck_dinner: req.body.D3_ck_dinner,
        ck_car: req.body.D3_ck_car,
        br_car: req.body.D3_br_car,
        ck_hotel: req.body.D3_ck_hotel,
        br_area: req.body.D3_br_area,
        br_hotel: req.body.D3_br_hotel,
        ck_experiences: req.body.D3_ck_experiences,
        dd_experiences: req.body.D3_dd_experiences,
        ck_ticket: req.body.D3_ck_ticket,
        dd_ticket: req.body.D3_dd_ticket,
        num_other: parseFloat(req.body.D3_num_other) || 0
      },
      {
        ck_guide: req.body.D4_ck_guide,
        ck_lunch: req.body.D4_ck_lunch,
        ck_dinner: req.body.D4_ck_dinner,
        ck_car: req.body.D4_ck_car,
        br_car: req.body.D4_br_car,
        ck_hotel: req.body.D4_ck_hotel,
        br_area: req.body.D4_br_area,
        br_hotel: req.body.D4_br_hotel,
        ck_experiences: req.body.D4_ck_experiences,
        dd_experiences: req.body.D4_dd_experiences,
        ck_ticket: req.body.D4_ck_ticket,
        dd_ticket: req.body.D4_dd_ticket,
        num_other: parseFloat(req.body.D4_num_other) || 0
      },
      {
        ck_guide: req.body.D5_ck_guide,
        ck_lunch: req.body.D5_ck_lunch,
        ck_dinner: req.body.D5_ck_dinner,
        ck_car: req.body.D5_ck_car,
        br_car: req.body.D5_br_car,
        ck_hotel: req.body.D5_ck_hotel,
        br_area: req.body.D5_br_area,
        br_hotel: req.body.D5_br_hotel,
        ck_experiences: req.body.D5_ck_experiences,
        dd_experiences: req.body.D5_dd_experiences,
        ck_ticket: req.body.D5_ck_ticket,
        dd_ticket: req.body.D5_dd_ticket,
        num_other: parseFloat(req.body.D5_num_other) || 0
      },
      {
        ck_guide: req.body.D6_ck_guide,
        ck_lunch: req.body.D6_ck_lunch,
        ck_dinner: req.body.D6_ck_dinner,
        ck_car: req.body.D6_ck_car,
        br_car: req.body.D6_br_car,
        ck_hotel: req.body.D6_ck_hotel,
        br_area: req.body.D6_br_area,
        br_hotel: req.body.D6_br_hotel,
        ck_experiences: req.body.D6_ck_experiences,
        dd_experiences: req.body.D6_dd_experiences,
        ck_ticket: req.body.D6_ck_ticket,
        dd_ticket: req.body.D6_dd_ticket,
        num_other: parseFloat(req.body.D6_num_other) || 0
      },
      {
        ck_guide: req.body.D7_ck_guide,
        ck_lunch: req.body.D7_ck_lunch,
        ck_dinner: req.body.D7_ck_dinner,
        ck_car: req.body.D7_ck_car,
        br_car: req.body.D7_br_car,
        ck_hotel: req.body.D7_ck_hotel,
        br_area: req.body.D7_br_area,
        br_hotel: req.body.D7_br_hotel,
        ck_experiences: req.body.D7_ck_experiences,
        dd_experiences: req.body.D7_dd_experiences,
        ck_ticket: req.body.D7_ck_ticket,
        dd_ticket: req.body.D7_dd_ticket,
        num_other: parseFloat(req.body.D7_num_other) || 0
      },
      {
        ck_guide: req.body.D8_ck_guide,
        ck_lunch: req.body.D8_ck_lunch,
        ck_dinner: req.body.D8_ck_dinner,
        ck_car: req.body.D8_ck_car,
        br_car: req.body.D8_br_car,
        ck_hotel: req.body.D8_ck_hotel,
        br_area: req.body.D8_br_area,
        br_hotel: req.body.D8_br_hotel,
        ck_experiences: req.body.D8_ck_experiences,
        dd_experiences: req.body.D8_dd_experiences,
        ck_ticket: req.body.D8_ck_ticket,
        dd_ticket: req.body.D8_dd_ticket,
        num_other: parseFloat(req.body.D8_num_other) || 0
      },
      {
        ck_guide: req.body.D9_ck_guide,
        ck_lunch: req.body.D9_ck_lunch,
        ck_dinner: req.body.D9_ck_dinner,
        ck_car: req.body.D9_ck_car,
        br_car: req.body.D9_br_car,
        ck_hotel: req.body.D9_ck_hotel,
        br_area: req.body.D9_br_area,
        br_hotel: req.body.D9_br_hotel,
        ck_experiences: req.body.D9_ck_experiences,
        dd_experiences: req.body.D9_dd_experiences,
        ck_ticket: req.body.D9_ck_ticket,
        dd_ticket: req.body.D9_dd_ticket,
        num_other: parseFloat(req.body.D9_num_other) || 0
      },
      {
        ck_guide: req.body.D10_ck_guide,
        ck_lunch: req.body.D10_ck_lunch,
        ck_dinner: req.body.D10_ck_dinner,
        ck_car: req.body.D10_ck_car,
        br_car: req.body.D10_br_car,
        ck_hotel: req.body.D10_ck_hotel,
        br_area: req.body.D10_br_area,
        br_hotel: req.body.D10_br_hotel,
        ck_experiences: req.body.D10_ck_experiences,
        dd_experiences: req.body.D10_dd_experiences,
        ck_ticket: req.body.D10_ck_ticket,
        dd_ticket: req.body.D10_dd_ticket,
        num_other: parseFloat(req.body.D10_num_other) || 0
      },
    ]
  };
  const objResult = await calc(objReq);
  console.log(objResult.total_amount);

  //Log
  var strIP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
  if (strIP.includes("::ffff:")) strIP = strIP.replace('::ffff:', '');
  await db.insertSubmitLog(strIP, objReq, objResult);

  res.render('result', { objResult });
  // res.send('Calc Result')
});

router.post('/result_accept', isAuthenticated, async function (req, res, next) {
  const order_id = req.body.order_id;
  console.log(order_id);
  res.render('result_accept', { order_id });
});

router.post('/result_sendmail', isAuthenticated, async function (req, res, next) {
  const order_id = req.body.order_id;
  const contact = req.body.contact;
  await sendmail(order_id, contact);
  res.render('result_sendmail');
});

function isAuthenticated(req, res, next) {
  if (req.session.user) next()
  else res.redirect('/')
};

module.exports = router;
