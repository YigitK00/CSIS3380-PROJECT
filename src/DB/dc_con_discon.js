const mongoose = require("mongoose")

async function connectDb (){
    const bookDB= mongoose.connection;
    const dbName="csis_3380_projecy"
    mongoose.connect(`mongodb+srv://CSIS_3280:123@cluster0.t7i3yvb.mongodb.net/${dbName}`)
    return await bookDB.once("open",()=>{
        console.log("successfully connected to mongoDB")
    })

} 
async function closeConnectionDB(){
    await mongoose.connection.close()
    .then(()=>{console.log("connection closed")})
}
module.exports={
    connectDb,
    closeConnectionDB
}