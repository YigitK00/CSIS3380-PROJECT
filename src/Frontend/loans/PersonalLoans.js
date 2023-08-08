import React, { useEffect, useState } from 'react';
import axios from "axios";
import LoanCard from '../Util/LoanCard';
import PersonalLoansChart from "../Util/depreciationGraph"

function PersonalLoans() {

  const userEmail = () => {
    const value = `${document.cookie}`;
    const regex = /%22(.*)%22/g; // The actual regex
    const matches = regex.exec(value);
    const text =  matches[1];
    const textArray = text.split("%22:%22");
  
    return textArray[1];
  }

  const loanType = "Personal";
  
  const url = `http://localhost:4000/${loanType}/${userEmail()}`; // this is defined in the loan.routes. 

  const [loans, setLoans] = useState([]); // this is the storage for the data
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
    .get(
      url
    )
    .then((res) => {
      setLoans(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const deleteLoan = (id) => {
    axios
      .delete('http://localhost:4000/' + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

      setLoans(loans.filter((loan) => loan._id !== id));
  };

  const editLoan = (id) => {
    window.location = '/' + id;
  };

  const hideLoan = (id) => {
    setLoans(loans.filter((loan) => loan._id !== id));
  }

  if (isLoading) {
    return (
      <div>...Loading</div>
    )
  }
  else if (loans.length < 1) {
    return (
      <div>
        <h1 className="heading">No loans available</h1>
      </div>
    )
  }
  return (
  <div>
      {
      loans.map(oneLoan=>{
          let compounded_amount=oneLoan.amount
          let monthCompoundedOn=Math.round(12/oneLoan.compounding_period)

          let interest=0
          for(let month=0; month<oneLoan.term ;month++){
            if( (month+1) % monthCompoundedOn ==0 ){ // interest is generated 
              interest= compounded_amount *(oneLoan.interest_rate/100/12) *monthCompoundedOn
              compounded_amount+=interest
            }
          }
        
        console.log(oneLoan.amount)
        return <LoanCard 
          id={oneLoan._id}
          edit={editLoan}
          delete={deleteLoan}
          hide={hideLoan}

          name={oneLoan.name}
          amount={oneLoan.amount.toFixed(2)}
          interest_rate={oneLoan.interest_rate}

          due_in={oneLoan.term}
          life_time_cost={compounded_amount.toFixed(2)}
        />
      })}

      <PersonalLoansChart 
        chartTitle={loanType} 
        data={loans}
      />
    </div>
  );
}

export default PersonalLoans;