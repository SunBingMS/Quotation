const db = require("../db/sqlite.js");

async function calcFare(num_people, br_car) {
    var kind = "0";
    var fare = 0.0;
    if (br_car == "10h") {
        kind = "0";
    } else {
        kind = "1";
    }
    var tbCar = await db.getCar(kind);
    while (parseInt(num_people) > 0) {
        for (let i = 0; i < tbCar.length; i++) {
            if (parseInt(tbCar[i].upper_limit) >= parseInt(num_people)) {
                fare += parseFloat(tbCar[i].price);
                num_people -= parseInt(tbCar[i].upper_limit);
                break;
            }
        }
    }

    console.log("Car:" + fare);
    return (fare);
}

module.exports = async function calc(objReq) {

    //报价结果
    var objResult = {
        order_id:"",
        order_time:"",
        guide_qty: 0,
        lunch_qty: 0,
        dinner_qty: 0,
        car_qty: 0,
        hotel_qty: 0,
        experiences_qty: [],
        ticket_qty: [],
        tip_qty: 0,
        total_amount: 0.0
    };

    //勾选项目种类个数检查
    var intCheckBoxCount = 0;

    let total_day = 0.0;

    //订餐单价
    var tbFood = await db.getFood();
    //酒店单价
    var tbHotel;
    //酒店单价
    var tbHotel;
    //体验项目单价
    var tbProject;
    //订票单价
    var tbTicket;

    var intTotal_people = parseInt(objReq.num_adults) + parseInt(objReq.num_children);

    var date = new Date();
    date.setTime(date.getTime() + (9 * 60 * 60 * 1000));
    var str_date = date.toISOString().replace('T', ' ').substring(0, 19);
    objResult.order_id = str_date.replace(/ /g, '').replace(/-/g, '').replace(/:/g, '');
    objResult.order_time = str_date;

    for (let i = 0; i < objReq.travel_dates; i++) {
        total_day = 0.0;

        //导游服务
        if (objReq.days[i].ck_guide == "Y") {
            total_day += 30000;
            objResult.guide_qty += intTotal_people;
        }

        //订餐服务Lunch
        if (objReq.days[i].ck_lunch == "Y") {
            total_day += parseFloat(tbFood[0].price_adult) * objReq.num_adults
                + parseFloat(tbFood[0].price_child) * objReq.num_children;
            objResult.lunch_qty += intTotal_people;
        }

        //订餐服务Dinner
        if (objReq.days[i].ck_dinner == "Y") {
            total_day += parseFloat(tbFood[0].price_adult) * objReq.num_adults
                + parseFloat(tbFood[0].price_child) * objReq.num_children;
            objResult.dinner_qty += intTotal_people;
        }

        //包车费用
        if (objReq.days[i].ck_car == "Y") {
            total_day += await calcFare(intTotal_people, objReq.days[i].br_car);
            objResult.car_qty += 1;
        }

        //酒店费用
        if (objReq.days[i].ck_hotel == "Y") {
            tbHotel = await db.getHotel(objReq.days[i].br_hotel);
            if (objReq.travel_dates >= 5 || intTotal_people >= 10) {
                total_day += parseFloat(tbHotel[0].price_adult) * objReq.num_adults * 0.8
                + parseFloat(tbHotel[0].price_child) * objReq.num_children * 0.8;
            }
            else {
                total_day += parseFloat(tbHotel[0].price_adult) * objReq.num_adults
                + parseFloat(tbHotel[0].price_child) * objReq.num_children;
            }
            objResult.hotel_qty += intTotal_people;
        }

        //体验项目
        if (objReq.days[i].ck_experiences == "Y") {
            for (let j = 0; j < 5; j++) {
                if (objReq.days[i].dd_experiences[j] != "") {
                    tbProject = await db.getProject(objReq.days[i].dd_experiences[j]);
                    total_day += parseFloat(tbProject[0].price_adult) * objReq.num_adults
                        + parseFloat(tbProject[0].price_child) * objReq.num_children;
                    objResult.experiences_qty.push({ name: tbProject[0].name, qty: intTotal_people });
                }
            }
        }

        //订票服务 实际票价+实际票价10%
        if (objReq.days[i].ck_ticket == "Y") {
            for (let j = 0; j < 5; j++) {
                if (objReq.days[i].dd_ticket[j] != "") {
                    tbTicket = await db.getTicket(objReq.days[i].dd_ticket[j]);
                    total_day += parseFloat(tbTicket[0].price_adult) * 1.1 * objReq.num_adults
                        + parseFloat(tbTicket[0].price_child) * 1.1 * objReq.num_children;
                    objResult.ticket_qty.push({ name: tbTicket[0].name, qty: intTotal_people });
                }
            }
        }

        //超时服务、行程延长、或自由日添加项目
        if (objReq.days[i].num_other != "") {
            total_day += parseFloat(objReq.days[i].num_other);
        }

        //东京地区当天总价上浮5%
        if (objReq.days[i].br_area == "tokyo") {
            total_day = total_day * 1.05;
        }

        console.log("Day" + (i + 1) + ": " + Math.round(total_day));
        console.log(objReq.days[i].br_area);
        //每天金额累计
        objResult.total_amount += Math.round(total_day);
    }

    //服务小费
    objResult.total_amount += 2000 * objReq.num_adults + 2000 * objReq.num_children;
    objResult.tip_qty = parseInt(objReq.num_adults) + parseInt(objReq.num_children);

    //公司运营成本20% + 基础信息技术服务费用 + 基础设备添置
    objResult.total_amount = Math.round(objResult.total_amount * 1.2 + 20000 + 10000);

    //勾选项目种类低于3的话，不提供报价
    if (objResult.guide_qty > 0) intCheckBoxCount += 1;
    if (objResult.lunch_qty > 0) intCheckBoxCount += 1;
    if (objResult.dinner_qty > 0) intCheckBoxCount += 1;
    if (objResult.car_qty > 0) intCheckBoxCount += 1;
    if (objResult.hotel_qty > 0) intCheckBoxCount += 1;
    if (objResult.experiences_qty.length > 0) intCheckBoxCount += 1;
    if (objResult.ticket_qty.length > 0) intCheckBoxCount += 1;
    if (intCheckBoxCount < 3) objResult.total_amount = 0;

    return (objResult);
};