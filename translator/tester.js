// For testing purposes - simulating the sending end
let amqp = require('amqplib/callback_api');

let args = 
{
    ssn: 2310772323,
    creditScore: 700,
    loanAmount: 300000,
    loanDuration: 36
};

amqp.connect('amqp://datdb.cphbusiness.dk', function(err, conn) {
  conn.createChannel(function(err, ch) {
    let ex = 'ckkm-loanRequest';
    let msg = JSON.stringify(args);
    let routingKey = 'ckkm-PremiumBankTest'

    ch.assertExchange(ex, 'direct', {durable: false});
    ch.publish(ex, routingKey, new Buffer(msg));
    console.log(`Message has been sent using routingKey: ${routingKey} with the message: ${msg}`);
  });

  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});