"use strict";
// SOAP client example
var soap = require('soap');
var amqp = require('amqplib/callback_api');
var url = 'http://localhost:8001/wsdl?wsdl';

amqp.connect('amqp://datdb.cphbusiness.dk', function (err, conn) {
    conn.createChannel(function (err, ch) {
        let q = 'ckkm-PremiumBank'

        ch.assertQueue(q, { durable: false })
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
            console.log(" [x] %s: ", msg.content.toString());
            contactBank(url, translateRequest(msg.content.toString()), function (res) {
                console.log("Sending response to ckkm-test-queue")
                ch.sendToQueue('ckkm-PremiumBank-response', new Buffer(JSON.stringify(res)), {})
            });
        }, { noAck: true });

        // let ex = 'ckkm-loanRequest';
        // let routingKey = 'ckkm-PremiumBankTest'

        // ch.assertExchange(ex, 'direct', { durable: false });

        // ch.assertQueue('', { exclusive: true }, function (err, q) {
        //     console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
        //     ch.bindQueue(q.queue, ex, routingKey);
        //     ch.consume(q.queue, function (msg) {
        //         console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
        //         contactBank(url, translateRequest(msg.content.toString()), function (res) {
        //             ch.sendToQueue('ckkm-test-queue', new Buffer(JSON.stringify(res)), {})
        //         });
        //     }, { noAck: true });
        // });
    });
});

function contactBank(url, args, callback) {
    soap.createClient(url, function (err, client) {
        client.loan_request(args, function (err, result) { // the values in 'result' becomes strings because of bodyparser in app.js. Therefore we need to make them floats.
            for (var key in result) {
                result[key] = parseFloat(result[key]);
            }
            callback(result);
        });
    });
}

function translateRequest(args) {
    let jsonArgs = JSON.parse(args);
    let result = {
        ssn: jsonArgs.ssn,
        credit_score: jsonArgs.creditScore,
        loan_amount: jsonArgs.loanAmount,
        loan_duration: jsonArgs.loanDuration
    }
    return result;
}
