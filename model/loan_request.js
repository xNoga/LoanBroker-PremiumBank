function validateRequest(args) {
    let correctArgs = true;
    for (var arg in args) {
        if (typeof args[arg] !== 'string') { // Because the group decided to send ssn as a string -.-'
            if (Number.isNaN(parseFloat(args[arg]))) {
                correctArgs = false;
            }        
        }
    }

    if (
        correctArgs &&
        args.ssn.length === 11 && // 10 numbers and one dash ('-')
        parseFloat(args.credit_score) > 0 && parseFloat(args.credit_score) <= 800
    ) {
        return true;
    } else {
        return false;
    }
}

function calculateInterestRate(args) {
    var result = {
        interestRate: parseFloat((Math.random() * (3 - 8) + 8).toFixed(4)),
        ssn: parseFloat(args.ssn)  
    };
    
    return result;
}

module.exports = {
    validateRequest,
    calculateInterestRate,
}

