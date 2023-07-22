const { default: mongoose } = require("mongoose")

const loan_schema= new mongoose.Schema({
    loan_type:String
})


const laon_obj= mongoose.model("loan_type",loan_schema)

module.exports= laon_obj;