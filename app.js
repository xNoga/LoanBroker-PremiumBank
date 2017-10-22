var soap = require('soap');
var express = require('express');
var bodyParser = require('body-parser');
let loanReq = require('./model/loan_request');

var premiumBank = {
    PremiumBank_Service: {
        PremiumBank_Port: {
            loan_request: (args) => {
                if (loanReq.validateRequest(args)) {
                    const res = loanReq.calculateInterestRate(args);
                    console.log(`Request received at ${new Date()}. Request had the correct format and was accepted.`)
                    console.log(`Server responed with: ${JSON.stringify(res)}`)
                    return res;
                } else {
                    return {
                        request_loan: "There was an error in the input!"
                    }
                }
            },
            tester: () => {
                return {
                    greeting: "Hej med dig!!" 
                }
            }
        }
    }
};

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

//express server example
var app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(8001, function(){
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    soap.listen(app, '/wsdl', premiumBank, xml);
    console.log("Listening on port 8001");
});