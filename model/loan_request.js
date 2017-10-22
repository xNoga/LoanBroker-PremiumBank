function validateRequest(args) {
    let correctArgs = true;
    for (var arg in args) {
        if (Number.isNaN(parseFloat(args[arg]))) {
            correctArgs = false;
        }        
    }

    if (
        correctArgs &&
        args.ssn.toString().length === 10 &&
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

