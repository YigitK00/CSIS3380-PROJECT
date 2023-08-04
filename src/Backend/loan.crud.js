const user= require("./user.model")
const loan= require("./loan.model")
const { default: mongoose } = require("mongoose")

async function addLoanToUser(email, 
     type,expense, name, amount, interest_rate,term,
      compouning_period)
{
     await user.updateOne({"account.email":email},
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

async function readAll(email){
     return await user.findOne(
          {"account.email":email},
     )
     .then((data)=>{
          console.log("successfully got the loan data for user")
          return data.loan;

     })
     .catch(()=>{console.log("failed to find loan array")})
}

async function findByType(email, type){
     let data=await readAll(email)    
     let xx=[]
     for(let i=0; i<data.length; i++){
          if(data[i].type== type){
               xx.push(data[i])
          }
     }
     return(xx)
}


async function findByID(email, id){
   
     return await user.findOne(
          {"account.email":email}
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

// async function updateLoan(
//      email,id,
//      re_type, re_expense, re_name, re_amount, re_interestRate,re_term) {

          
//      await user.findOneAndUpdate(
//        { "account.email": email,  "loan._id":id },
//        {
//          $set: {
//            "loan.$.type": re_type,
//            "loan.$.expense": re_expense,
//            "loan.$.name": re_name,
//            "loan.$.amount": re_amount,
//            "loan.$.interest_rate": re_interestRate,
//            "loan.$.term": re_term,
//          },
//        },
//        {new:true}
//      )  
//        //   https://mongoosejs.com/docs/tutorials/findoneandupdate.html
//      .then(() => {
//        console.log("Updated successfully");
//      }).catch((error) => {
//        console.log("Failed to update loan:", error);
//      })

//      let x=await findByID(email)
//      console.log(x) 
// }
async function updateLoan(
     email, id,
     re_type,re_expense,re_name,re_amount,re_interestRate,re_term) {

     try {
          let obj = await findByID(email, id);

          // If obj is a Mongoose Document, use it directly
          if (obj instanceof mongoose.Model) {
          obj.type = re_type;
          obj.expense = re_expense;
          obj.name = re_name; // corrected property name from _name to name
          obj.amount = re_amount;
          obj.interest_rate = re_interestRate;
          obj.term = re_term;

          await obj.save();
          console.log("Updated successfully");
          } else {
          console.log("Failed to update: Object not found or not a Mongoose Document.");
          }

     } catch (error) {
          console.log("Failed to update loan:", error);
     }
}

async function deleteLoan(email, id) {

     
     await user.findOneAndUpdate(
          { "name.first": fname, "name.last": lname },
          { $pull: { loan: { _id: id } } }
     ).then((data) => {
          console.log(data);
     }).catch((error) => {
          console.log("Failed to delete loan:", error);
     });
}

module.exports={
     addLoanToUser,
     readAll,
     findByID,
     findByType,
     updateLoan,
     deleteLoan,
}