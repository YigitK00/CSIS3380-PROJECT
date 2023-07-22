const _laon=require('../Models/loan.model')
const mongoose = require('mongoose')

const user_schema= mongoose.Schema({
    full_name:String,
    email:String,
    password:String,
    loans:{ _laon } 
})

const user_obj= mongoose.model('user_obj',user_schema)
module.exports =user_obj

