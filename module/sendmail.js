require('dotenv').config();
const nodemailer = require('nodemailer');
const db = require("../db/sqlite.js");

async function makeMail(order_id, contact) {
    var htmlMail = "";
    const tbOrder = await db.getOrder(order_id);

    htmlMail += "<style>";
    htmlMail += " table {border-collapse: collapse;}";
    htmlMail += " td {text-align: center;}";
    htmlMail += " .hinnm {text-align: left;}";
    htmlMail += " .title {background-color: #007bbb; color: white;}";
    htmlMail += "</style>";
    htmlMail += "<p>Amount:&yen;" + tbOrder[0].amount.toLocaleString("ja-JP")  + "</p>";
    htmlMail += "<p>Order ID: " + tbOrder[0].id + "</p>";
    htmlMail += "<p>Time: " + tbOrder[0].time + "</p>";
    htmlMail += "<p>IP: " + tbOrder[0].ip + "</p>";
    htmlMail += "<p>Contact Information:</p>";
    htmlMail += "<p>" + contact + "</p>";
    htmlMail += "<br/>";
    htmlMail += "<hr>";

    htmlMail += "<p>Number of adults: " + tbOrder[0].num_adults + "</p>";
    htmlMail += "<p>Number of children: " + tbOrder[0].num_children + "</p>";
    htmlMail += "<p>Travel Dates: " + tbOrder[0].travel_dates + "</p>";
    htmlMail += "<br/>";

    htmlMail += "<table border='1' cellpadding='5'>";
    htmlMail += "<tr class='title'>";
    htmlMail += "  <th>Days</th>";
    htmlMail += "  <th>Guide</th>";
    htmlMail += "  <th>Lunch</th>";
    htmlMail += "  <th>Dinner</th>";
    htmlMail += "  <th>Car</th>";
    htmlMail += "  <th>Car-Type</th>";
    htmlMail += "  <th>Hotel</th>";
    htmlMail += "  <th>Hotel-Area</th>";
    htmlMail += "  <th>Hotel-Type</th>";
    htmlMail += "  <th>Exp</th>";
    htmlMail += "  <th>Exp-Code</th>";
    htmlMail += "  <th>Ticket</th>";
    htmlMail += "  <th>Ticket-Code</th>";
    htmlMail += "  <th>Other</th>";
    htmlMail += " </tr>";

    const tbOrderDetail = await db.getOrderDetail(order_id);
    for (let i = 0; i < tbOrder[0].travel_dates; i++) {
        htmlMail += "<tr>";
        htmlMail += " <td>Day" + (i + 1) + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].ck_guide + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].ck_lunch + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].ck_dinner + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].ck_car + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].br_car + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].ck_hotel + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].br_area + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].br_hotel + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].ck_experiences + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].dd_experiences + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].ck_ticket + "</td>";
        htmlMail += " <td>" + tbOrderDetail[i].dd_ticket + "</td>";
        htmlMail += " <td>&yen;" + tbOrderDetail[i].num_other + "</td>";
        htmlMail += "</tr>";
    }
    htmlMail += "</table>";
    // tbLog.forEach((item)=> {
    // });

    return (htmlMail);
}

module.exports = async function sendmail(order_id, contact) {

    const htmlMail = await makeMail(order_id, contact);

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const data = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_TO,
        cc: '',
        bcc: '',
        text: "",
        html: htmlMail,
        subject: 'New Order: ' + order_id,
    };

    transporter.sendMail(data, (error, info) => {
        if (error) {
            console.log(error); // エラー情報
        } else {
            console.log(info);  // 送信したメールの情報
        }
    });

};