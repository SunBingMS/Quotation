

module.exports = function handleRequestBody(reqBody) {

    let total_sum = 0.0;
    let total_day = 0.0;

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

    for (let i = 0; i < objReq.travel_dates; i++) {
        total_day = 0.0;

        //Guide
        if (objReq.days[i].ck_guide == "Y") {
            total_day += 30000;
        }

        //Lunch
        if (objReq.days[i].ck_lunch == "Y") {
            total_day += 3000 * objReq.num_adults + 3000 * objReq.num_children;
        }

        //Dinner
        if (objReq.days[i].ck_dinner == "Y") {
            total_day += 3000 * objReq.num_adults + 3000 * objReq.num_children;
        }

        //Car
        if (objReq.days[i].ck_car == "Y") {
            // total += calcFare(objReq.num_adults + objReq.num_children, objReq.days[i].br_car);
            total_day += 3000 * objReq.num_adults + 3000 * objReq.num_children;
        }

        //Hotel
        if (objReq.days[i].ck_hotel == "Y") {
            total_day += 12000 * objReq.num_adults + 12000 * objReq.num_children;
        }

        //Experient
        for (let j = 0; j < 3; j++) {
            if (objReq.days[i].dd_experient[j] != "") {
                total_day += 12000 * objReq.num_adults + 12000 * objReq.num_children;
            }
        }

        //Ticket
        for (let j = 0; j < 3; j++) {
            if (objReq.days[i].dd_ticket[j] != "") {
                total_day += 12000 * 1.1 * objReq.num_adults + 12000 * 1.1 * objReq.num_children;
            }
        }

        //Other
        if (objReq.days[i].num_other != "") {
            total_day += objReq.days[i].num_other;
        }

        //Tokyo
        if (objReq.days[i].br_area = "tokyo") {
            total_day = total_day * 1.1;
        }

        total_sum += total_day;
    }

    var objResult = {
        total_amount: total_sum
    };

    return (objResult);
};