const router= require('express').Router()
const model = require('./loan.model')
const db= require("./db_connect")
const loanCrud = require('./loan.crud')

// make loan
router.post("/loan/:fname&:lname",async (req, res)=>{
     // search for user. 
     const fname= (req.params.fname)
     const lname= (req.params.lname)
   
     //loan properties. 
     const type= (req.body.type)
     const name= (req.body.name)
     const amount= (req.body.amount)
     const interest_rate= (req.body.interest_rate)
     const term= (req.body.term)
     const compouning_period= (req.body.compouning_period)
     const expense= req.body.expense

     if(
          fname== null|| lname== null|| type== null|| name== null||amount== null||
          interest_rate== null|| term== null|| compouning_period== null|| expense== null
          ){
          res.status(400).json({res:`need to have the following values: fname lname type name amount interest_rate term compounindg_period expense ex: { "type":"personal loan","name": "education", "amount": 1500,"interest_rate": 5.4,"term": 12,"compounind_period":3, "expense":true}`
          })

     }else{
          try{
               await db.connect()
               await loanCrud.addLoanToUser(fname, lname, 
                    type, expense, name, amount, interest_rate,
                    term, compouning_period)
               await db.disconnect()
          }catch(e){
               res.status(400).json({res:"failed to add user to the db" })
          }finally{
               res.status(200).json({res:"sucesfully added loan to user" })
          }
     }
})

// need to go from more specifc to less specific since it follows the same path almost. 
// find one 
router.get("/loan/:fname&:lname&:id",async (req, res)=>{
     const fname= req.params.fname
     const lname =req.params.lname 
     const id= req.params.id

     if(
          fname==null||
          lname==null||
          id==null                    
     ){
          res.status(400).json({res:"missing paramter, ned first and last name with loan id"})
     }else{
          await db.connect()
          const data= await loanCrud.findByID(fname, lname, id)
          await db.disconnect()
          res.status(200).json({res:data})
     }
})

// find by type "personal loan"
// router.get("/loan/?:fname",async (req, res)=>{
//      console.log(
//           req,
//           // req.params.lname,
//           // req.params.type
//           )

//      // how to i get the following url?
//      //get.("/loan/?name=:fname& lname=:lname& type=:type")
// })



//findall 
router.get("/loan/:fname&:lname", async(req, res)=>{
     if(req.params.fname == null ||req.params.lname == null ){
          res.status(400).json({res:"invalid requrest"})
     }else{
          try{
               await db.connect()
               const data=await loanCrud.readAll(req.params.fname,req.params.lname )
               await db.disconnect()
               res.status(200).json({res:data})
          }catch(e){
               res.status(400).json({res:"failed to return the loan data beacuse "+e})
          }
     }
})


//update loan 
router.put("/loan/:fname&:lname&:id", async(req, res)=>{
     
     await db.connect();

     await loanCrud.updateLoan(
          req.params.fname, 
          req.params.lname, 
          req.params.id,

          req.body.type,
          req.body.expense,
          req.body.name,
          req.body.amount,
          req.body.interest_rate,
          req.body.term,
     )
     await db.disconnect()
})


//delete loan
router.delete("/loan/:fname&:lname&:id", async(req, res)=>{
     const fname= req.params.fname
     const lname =req.params.lname 
     const id= req.params.id
     
     await db.connect()
     await loanCrud.deleteLoan(fname, lname, id)
     await db.disconnect()
})




module.exports= router