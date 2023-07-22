const { default: mongoose } = require("mongoose")

const loan_schema=mongoose.Schema({
    loan_amount:Number,
    loan_interest_rate:Number,
    loan_repayment_period: Number,
    // how much interest is paid over the life of the loan?
})

const loan= mongoose.model("loan",loan_schema);
module.exports=loan