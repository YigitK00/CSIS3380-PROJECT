const router=require("express").Router()
const db= require("./db_connect")
const crud= require('./user.cruds')

     // this page deals with the user. 

router.get("/",async(req, res)=>{
     res.json({msg:"i here "})
})
router.get("/dumpDB",async (req, res)=>{
     try{
          await db.connect()
          await crud.dumpDB()
          await db.disconnect()
     }catch(e){
          console.log("failed to delete the db")
     }finally{
          res.status(200).json({res:"successfully dumped the data in the document"})
     }
})


//insert a newly registered user, so lName, fName, email, password
router.post("/register",async (req, res)=>{
     if(req.body.first==null ||req.body.last==null||req.body.email==null||req.body.password==null
          ){
          res.status(400).json({res:"need to add first and last name with email and passwordd "})     
     }else{
          
          await db.connect()
          // await crud.dumpDB()
          const value=await crud.makeUser(
               req.body.first, req.body.last,
               req.body.email, req.body.password
               )
          
          if(value ==-1){
               await db.disconnect()
               res.status(400).json({res:"email in use "})
               return
          }
          await db.disconnect()

          res.status(200).json({res:"added user "})
     }
})

//read // read by name 
router.get("/user/:first&:last", async (req, res)=>{
     const first=(req.params.first)
     const last=(req.params.last)
     
     if(first ==null || last== null){
          res.status(400).json({res:"enter 'firstname&lastname', exmaple:'james&oneal'"})
     }else{
          // console.log(req.params.first)
          // console.log(req.params.last)
          await db.connect()
          
          const user=( await crud.findByName(first, last))
          // user= JSON.parse(user)

          // console.log("user found\n"+user)
 
          await db.disconnect()
          res.status(200).json({res:user})
     }
})

//update 
router.put("/user/:first&:last", async (req, res)=>{
     find_fName=req.params.first 
     find_lName=req.params.last
     //replace values
     re_fName=req.body.first
     re_lName=req.body.last
     re_email=req.body.email
     re_password=req.body.password
     
     if(find_fName ==null||find_lName==null||re_fName ==null||re_lName ==null||re_email==null||re_password==null){
          res.status().json({res:"need to have firstname lastname, and the replaceing values for fname lname, email, password "})
     }else{

          await db.connect()

          await crud.UpdateUserByFirstLastName(
               find_fName,find_lName,re_fName,re_lName,re_email,re_password,
          )
          .then( async ()=>{
               await db.disconnect()
               res.status(200).json({res:"updates the user succesfully"})
          })
          .catch( async ()=>{
               await db.disconnect()        
               res.status(400).json({res:"failed to update the user"} ) 
          })

     }

})

//delete
router.delete("/user/:first&:last", async(req, res)=>{
     const fname=req.params.first
     const lname=req.params.last 

     if(
          lname== null,
          fname== null
     ){
          res.status(400).json({res:"give first and last name of the user to be deleted"})
     }else{

          try{
               await db.connect()
               await crud.deleteUserByFLName(fname, lname)
               await db.disconnect()
               res.status(200).json({res:"delete user successful"})
          }catch(e){
               res.status(400).json({res:"delete user failed"})
          }
     }
})

//allow the user to log in 
//find by email, compare passwords. 

module.exports=router


