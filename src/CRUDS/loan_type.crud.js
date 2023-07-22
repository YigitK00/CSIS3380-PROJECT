// this is mean to read the content from seeder loan_types

const loan_type= require("../Models/loan_types.model")

async function getAllLoans(){
    return await loan_type.find()
}

module.exports={
    getAllLoans
}