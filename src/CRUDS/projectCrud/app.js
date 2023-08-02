const express= require("express");
const bodyParser= require("body-parser");
const app= express();
const cors = require('cors');
const port=5000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const crud_user= require("./user.routes");
app.use("/",crud_user);

const crud_loan= require("./loan.routes");
app.use("/",crud_loan);


app.get("*",(req,res)=>{
     res.send("404 page bad request");
})


app.listen(port, ()=>{
     console.log("app in port "+port);
})