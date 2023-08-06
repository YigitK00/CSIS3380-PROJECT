import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loanCard from "./Util/loanCard"
import db from "../Backend/db_connect"


export default function handleBuisness(){
     // let [the current state, how to access the state ] = inital value of state 
     const url=`mongodb+srv://CSIS_3280:123@cluster0.t7i3yvb.mongodb.net/${dbName}`
     
     // get all the business loans from the DB
     let [allTheBizEntries, xx]=async ()=>{
          await db.connect()

          axios.get()

     }
     
     //make a card that will add a new business laon. 
     // get all the values from the database 
          // make a card to display all of them. 


     

};