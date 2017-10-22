"use strict";
// SOAP client example
var soap = require('soap');
var url = 'http://localhost:8001/wsdl?wsdl';
var args = 
    {
        ssn: 2310772323,
        credit_score: 700,
        loan_amount: 300000,
        loan_duration: 36
    };

soap.createClient(url,function(err,client) {
    client.loan_request(args,function(err,result) {
        console.log(result);
    });
});
