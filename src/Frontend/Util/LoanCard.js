import React from "react";


export default function LoanCard (prop){
return (
     <div class="card">
          <h2>{prop.name}</h2>
          <span>${prop.amount} interest rate of {prop.interest_rate}% due in {prop.due_in} 
          months will cost ${prop.life_time_cost} over the course of its lifetime.</span>
     <button
          onClick={()=>{
          prop.edit(prop.id)
          }}
     >Edit</button>

     <button
          onClick={()=>{
          prop.delete(prop.id)
          }}
     >Delete</button>
     </div>
     
)
}
