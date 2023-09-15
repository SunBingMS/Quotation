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

module.exports = async function calc(reqBody) {

    //报价结果
    var objResult = {
        guide_qty: 0,
        lunch_qty: 0,
        dinner_qty: 0,
        car_qty: 0,
        hotel_qty: 0,
        experient_qty: [],
        ticket_qty: [],
        tip_qty: 0,
        total_amount: 0.0
    };

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

    var objReq = {
        num_adults: parseInt(reqBody.num_adults),
        num_children: parseInt(reqBody.num_children),
        travel_dates: parseInt(reqBody.travel_dates),
        days: [
            {
                ck_guide: reqBody.D1_ck_guide,
                ck_lunch: reqBody.D1_ck_lunch,
                ck_dinner: reqBody.D1_ck_dinner,
                ck_car: reqBody.D1_ck_car,
                br_car: reqBody.D1_br_car,
                ck_hotel: reqBody.D1_ck_hotel,
                br_area: reqBody.D1_br_area,
                br_hotel: reqBody.D1_br_hotel,
                dd_experient: reqBody.D1_dd_experient,
                dd_ticket: reqBody.D1_dd_ticket,
                num_other: parseFloat(reqBody.D1_num_other)
            },
            {
                ck_guide: reqBody.D2_ck_guide,
                ck_lunch: reqBody.D2_ck_lunch,
                ck_dinner: reqBody.D2_ck_dinner,
                ck_car: reqBody.D2_ck_car,
                br_car: reqBody.D2_br_car,
                ck_hotel: reqBody.D2_ck_hotel,
                br_area: reqBody.D2_br_area,
                br_hotel: reqBody.D2_br_hotel,
                dd_experient: reqBody.D2_dd_experient,
                dd_ticket: reqBody.D2_dd_ticket,
                num_other: parseFloat(reqBody.D2_num_other)
            },
            {
                ck_guide: reqBody.D3_ck_guide,
                ck_lunch: reqBody.D3_ck_lunch,
                ck_dinner: reqBody.D3_ck_dinner,
                ck_car: reqBody.D3_ck_car,
                br_car: reqBody.D3_br_car,
                ck_hotel: reqBody.D3_ck_hotel,
                br_area: reqBody.D3_br_area,
                br_hotel: reqBody.D3_br_hotel,
                dd_experient: reqBody.D3_dd_experient,
                dd_ticket: reqBody.D3_dd_ticket,
                num_other: parseFloat(reqBody.D3_num_other)
            },
            {
                ck_guide: reqBody.D4_ck_guide,
                ck_lunch: reqBody.D4_ck_lunch,
                ck_dinner: reqBody.D4_ck_dinner,
                ck_car: reqBody.D4_ck_car,
                br_car: reqBody.D4_br_car,
                ck_hotel: reqBody.D4_ck_hotel,
                br_area: reqBody.D4_br_area,
                br_hotel: reqBody.D4_br_hotel,
                dd_experient: reqBody.D4_dd_experient,
                dd_ticket: reqBody.D4_dd_ticket,
                num_other: parseFloat(reqBody.D4_num_other)
            },
            {
                ck_guide: reqBody.D5_ck_guide,
                ck_lunch: reqBody.D5_ck_lunch,
                ck_dinner: reqBody.D5_ck_dinner,
                ck_car: reqBody.D5_ck_car,
                br_car: reqBody.D5_br_car,
                ck_hotel: reqBody.D5_ck_hotel,
                br_area: reqBody.D5_br_area,
                br_hotel: reqBody.D5_br_hotel,
                dd_experient: reqBody.D5_dd_experient,
                dd_ticket: reqBody.D5_dd_ticket,
                num_other: parseFloat(reqBody.D5_num_other)
            },
            {
                ck_guide: reqBody.D6_ck_guide,
                ck_lunch: reqBody.D6_ck_lunch,
                ck_dinner: reqBody.D6_ck_dinner,
                ck_car: reqBody.D6_ck_car,
                br_car: reqBody.D6_br_car,
                ck_hotel: reqBody.D6_ck_hotel,
                br_area: reqBody.D6_br_area,
                br_hotel: reqBody.D6_br_hotel,
                dd_experient: reqBody.D6_dd_experient,
                dd_ticket: reqBody.D6_dd_ticket,
                num_other: parseFloat(reqBody.D6_num_other)
            },
            {
                ck_guide: reqBody.D7_ck_guide,
                ck_lunch: reqBody.D7_ck_lunch,
                ck_dinner: reqBody.D7_ck_dinner,
                ck_car: reqBody.D7_ck_car,
                br_car: reqBody.D7_br_car,
                ck_hotel: reqBody.D7_ck_hotel,
                br_area: reqBody.D7_br_area,
                br_hotel: reqBody.D7_br_hotel,
                dd_experient: reqBody.D7_dd_experient,
                dd_ticket: reqBody.D7_dd_ticket,
                num_other: parseFloat(reqBody.D7_num_other)
            },
            {
                ck_guide: reqBody.D8_ck_guide,
                ck_lunch: reqBody.D8_ck_lunch,
                ck_dinner: reqBody.D8_ck_dinner,
                ck_car: reqBody.D8_ck_car,
                br_car: reqBody.D8_br_car,
                ck_hotel: reqBody.D8_ck_hotel,
                br_area: reqBody.D8_br_area,
                br_hotel: reqBody.D8_br_hotel,
                dd_experient: reqBody.D8_dd_experient,
                dd_ticket: reqBody.D8_dd_ticket,
                num_other: parseFloat(reqBody.D8_num_other)
            },
            {
                ck_guide: reqBody.D9_ck_guide,
                ck_lunch: reqBody.D9_ck_lunch,
                ck_dinner: reqBody.D9_ck_dinner,
                ck_car: reqBody.D9_ck_car,
                br_car: reqBody.D9_br_car,
                ck_hotel: reqBody.D9_ck_hotel,
                br_area: reqBody.D9_br_area,
                br_hotel: reqBody.D9_br_hotel,
                dd_experient: reqBody.D9_dd_experient,
                dd_ticket: reqBody.D9_dd_ticket,
                num_other: parseFloat(reqBody.D9_num_other)
            },
            {
                ck_guide: reqBody.D10_ck_guide,
                ck_lunch: reqBody.D10_ck_lunch,
                ck_dinner: reqBody.D10_ck_dinner,
                ck_car: reqBody.D10_ck_car,
                br_car: reqBody.D10_br_car,
                ck_hotel: reqBody.D10_ck_hotel,
                br_area: reqBody.D10_br_area,
                br_hotel: reqBody.D10_br_hotel,
                dd_experient: reqBody.D10_dd_experient,
                dd_ticket: reqBody.D10_dd_ticket,
                num_other: parseFloat(reqBody.D10_num_other)
            },
        ]
    };

    var intTotal_people = parseInt(objReq.num_adults) + parseInt(objReq.num_children);

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
                + parseFloat(tbFood[0].price_adult) * objReq.num_children;
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
            total_day += parseFloat(tbHotel[0].price_adult) * objReq.num_adults
                + parseFloat(tbHotel[0].price_adult) * objReq.num_children;
            objResult.hotel_qty += intTotal_people;
        }

        //体验项目
        for (let j = 0; j < 3; j++) {
            if (objReq.days[i].dd_experient[j] != "") {
                tbProject = await db.getProject(objReq.days[i].dd_experient[j]);
                total_day += parseFloat(tbProject[0].price_adult) * objReq.num_adults
                    + parseFloat(tbProject[0].price_adult) * objReq.num_children;
                objResult.experient_qty.push({name: tbProject[0].name, qty: intTotal_people});
            }
        }

        //订票服务 实际票价+实际票价10%
        for (let j = 0; j < 3; j++) {
            if (objReq.days[i].dd_ticket[j] != "") {
                tbTicket = await db.getTicket(objReq.days[i].dd_ticket[j]);
                total_day += parseFloat(tbTicket[0].price_adult) * 1.1 * objReq.num_adults
                    + parseFloat(tbTicket[0].price_adult) * 1.1 * objReq.num_children;
                objResult.ticket_qty.push({name: tbTicket[0].name, qty: intTotal_people});
            }
        }

        //超时服务、行程延长、或自由日添加项目
        if (objReq.days[i].num_other != "") {
            total_day += parseFloat(objReq.days[i].num_other);
        }

        //东京地区当天总价上浮10%
        if (objReq.days[i].br_area == "tokyo") {
            total_day = total_day * 1.1;
        }

        console.log("Day" + (i + 1) + ": " + Math.round(total_day));
        console.log(objReq.days[i].br_area);
        //每天金额累计
        objResult.total_amount += Math.round(total_day);
    }

    //服务小费
    objResult.total_amount += 2000 * objReq.num_adults + 2000 * objReq.num_children;
    objResult.tip_qty = parseInt(objReq.num_adults) + parseInt(objReq.num_children);

    //公司运营成本15% + 基础信息技术服务费用 + 基础设备添置
    objResult.total_amount = Math.round(objResult.total_amount * 1.15 + 20000 + 10000);

    return (objResult);
};