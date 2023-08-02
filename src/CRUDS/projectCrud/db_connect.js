const mongoose= require("mongoose")

// connect and disconnect
async function connect(){
     const dbName="project_crud"
     // const url=`mongodb+srv://CSIS_3280:123@cluster0.t7i3yvb.mongodb.net/${dbName}`
     const url=`mongodb://127.0.0.1:27017/${dbName}`
     await mongoose.connect(url)
     .then(()=>{console.log("\nDB connected") })
     .catch(()=>{console.log("DB not connected") })
}

async function disconnect(){
     await mongoose.disconnect()
     .then(()=>{console.log("DB disconnected") })
     .catch(()=>{console.log("DB not dis-connected") })
}


module.exports={
     connect,
     disconnect
}




// .then(()=>{console.log() })
// .catch(()=>{console.log() })