const user= require("./user.model")
const loan= require("./loan.model")

async function addLoanToUser(fname, lname, 
     type,expense, name, amount, interest_rate,term,
      compouning_period)
{
     await user.updateOne({"name.first":fname, "name.last":lname},
     {$push:{"loan":
          new loan({
               "type":type,
               "expense":expense,
               "name":name,
               "amount":amount,
               "interest_rate":interest_rate,
               "term":term,
               "compouning_period":compouning_period
          })
     }}).then(()=>{
          console.log(`added loan successfully to ${fname} ${lname}`)
     })
     .catch(()=>{
          console.log("error adding loan to user")
     })

     
}

async function readAll(fname, lname){
     return await user.findOne(
          {"name.first": fname,"name.last": lname},
     )
     .then((data)=>{
          console.log("successfully got the loan data for user")
          return data.loan;
   
     })
     .catch(()=>{console.log("failed to find loan array")})
}

async function findByID(fname, lname, id){
   
     return await user.findOne(
          {"name.first":fname, "name.last":lname}
     )
     .then((data)=>{
          for(let i =0; i<data.loan.length; i++){
               if(data.loan[i]._id ==id){
                    console.log("found the loan succesfully")
                    return data.loan[i]    
               }
          }
     })
     .catch(()=>{
          console.log("failed to get the loan by id")
     })
}


async function deleteLoan(fname, lname, id){

    await user.updateOne(
          {"name.first":fname, "name.last":lname},
          {$pull: {loan: {_id:id}}}
     ).then((data)=>{
          console.log(data)
     })
    
    
    
     // let pos_rem=await user.findOne(
     //      {"name.first":fname, "name.last":lname}
     //      )
     // .then((data)=>{

     //      let pos_rem=0
     //      for(let i=0; i <data.loan.length; i++){
     //           if(data.loan[i]._id ==id ){
     //                pos_rem=i
     //                break
     //           }
     //      }
     //      return pos_rem          
     // }).catch(()=>{
     //      console.log("failed to find which obj to remove")
     // })
     
     // await user.updateOne({"name.first":fname, "name.last":lname}, 
     //      {$pull: {"loan":{_id:id }}}) //pos_rem}})
     // .then((data)=>{
     //      console.log(data)

     //      console.log("removed loan successfully")
     // }).catch(()=>{
     //      console.log("failed to remove the loan ")
     // })

     // console.log( await findByID(fname, lname, id))

}


async function updateLoan(fname, lname, id,
     re_type,re_expense,re_name, re_amount, re_interestRate,re_term 
     ){
     //https://youtu.be/yLjfS5iKZPM?t=454
     //https://www.mongodb.com/docs/manual/reference/operator/update/positional/

     await user.updateOne(
          {"loan._id":`ObjectId('${id}')`},
          {$set:{
               "loan.$.type":"sunshien"
          }}
     ).then(()=>{
          console.log("cant update")
     })
     // .catch(()=>{console.log("failed to update loan")})
     
}


module.exports={
     addLoanToUser,
     readAll,
     findByID,

     updateLoan,
     deleteLoan,
}