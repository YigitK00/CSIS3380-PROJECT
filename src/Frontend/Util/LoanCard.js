import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";



export default function LoanCard (prop){
return (
     <div className="card">
          <h2>{prop.name}</h2>
          <span>${prop.amount} interest rate of {prop.interest_rate}% due in {prop.due_in} 
          months will cost ${prop.life_time_cost} over the course of its lifetime.</span>
     <br/>
    
    <div>
          <button type="button" class="
          btn btn-outline-primary"
               onClick={()=>{
                    prop.edit(prop.id)
                    }}
          >Edit</button>

          <button 
          onClick={()=>{
               prop.delete(prop.id)
               }}
          type="button" class="btn btn-outline-danger">Delete</button>
          </div>
     
     </div>
     
)
}
