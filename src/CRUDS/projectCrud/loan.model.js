const mongoose= require('mongoose')

const mongooseSchema= mongoose.Schema({
     "type":String,
     "expense":Boolean,
     "name":String,
     "amount":Number,
     "interest_rate":Number,
     "term":Number, // in months
     "compouning_period":Number
})
 
module.exports= mongoose.model("loan",mongooseSchema)