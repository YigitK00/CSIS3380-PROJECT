const router= require('express').Router()
const model = require('./loan.model')
const db= require("./db_connect")
const loanCrud = require('./loan.crud')

//******************         Create    ****************** */
router.post("/loan/:email",async (req, res)=>{
     // search for user. 
     const email= (req.params.email)
   
     //loan properties. 
     const type= (req.body.type)
     const name= (req.body.name)
     const amount= (req.body.amount)
     const interest_rate= (req.body.interest_rate)
     const term= (req.body.term)
     const compouning_period= (req.body.compouning_period)
     const expense= req.body.expense

     if(
          email==null|| 
          type== null|| name== null||amount== null|| interest_rate== null||
          term== null|| compouning_period== null|| expense== null
          ){
          res.status(400).json({res:`need to have the following values: fname lname type name amount interest_rate term compounindg_period expense ex: { "type":"personal loan","name": "education", "amount": 1500,"interest_rate": 5.4,"term": 12,"compounind_period":3, "expense":true}`
          })
     }else{
          try{
               await db.connect()
               await loanCrud.addLoanToUser(email, 
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

//******************         Read    ****************** */
// need to go from more specifc to less specific since it follows the same path almost. 

// find all
router.get("/loan/:email",async(req, res)=>{
     let email=(req.params.email)
     if(email == null){
          res.status(400).json({res:"need a email parameter"})
     }
     try{
          await db.connect();
          let data=await loanCrud.readAll(email)
          await db.disconnect();
          res.status(200).json({res:data})
     }catch(e){
          res.status(500).json({res:"db read failed, loan line 56"})
     }
     console.log(data)
})

// find by type 
router.get("/loan/:email/type/:type", async(req, res)=>{
     let type=req.params.type
     let email=req.params.email
     if(type== null || email==null){
          res.status(400).json({res:"need type of loan and email"})
     }

     await db.connect()
     let data= await loanCrud.findByType(email,type)
     await db.disconnect()
     
     if(data.length==0){
          res.status(400).json({res:"no matches found"})
     }

     res.status(200).json({res:data})
})

// find by id 
router.get("/loan/:email/id/:id", async(req, res)=>{
     //some code
     let email=req.params.email
     let id=req.params.id

     if(email==null|| id==null){
          res.status(400).json({res:"need both email and id"})
     }

     await db.connect()
     let data =await loanCrud.findByID(email, id)
     await db.disconnect()

     res.status(200).json({res:data})
})


//******************         update    ****************** */
// i dont work 
router.put("/loan/:email/:id", async(req, res)=>{
     let email= req.params.email
     let id= req.params.id
     let type= req.body.type
     let expense= req.body.expense
     let _name= req.body.name
     let amount= req.body.amount
     let interest_rate= req.body.interest_rate
     let term= req.body.term

     await db.connect()
     await loanCrud.updateLoan(
          email,id,type,expense,_name,amount,interest_rate,term
     )

     await db.disconnect()

})

//******************         delete    ****************** */
router.delete("/loans/:email/:id", async(req, res)=>{
     await db.connect()
     
     await db.disconnect()


})



module.exports= router