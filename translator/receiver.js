"use strict";
// For testing purposes - simulating the receiving end
var soap = require('soap');
var amqp = require('amqplib/callback_api');


amqp.connect('amqp://datdb.cphbusiness.dk', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'ckkm-test-queue';

        ch.assertQueue(q, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {noAck: true});
    });
});