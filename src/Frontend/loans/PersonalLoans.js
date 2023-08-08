import React, { Component, useState } from 'react';
import axios, { all } from "axios";
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

  useState(() => {
    axios
    .get(
      url
    )
    .then((res) => {
      setLoans(res.data);
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


  return (
  <div  class="container">
      {
      fakeDB.map(oneLoan=>{
          let compounded_amount=oneLoan.amount
          let monthCompoundedOn=Math.round(12/oneLoan.compounding_period)

          let interest=0
          for(let month=0; month<oneLoan.term ;month++){
            if( (month+1) % monthCompoundedOn ==0 ){ // interest is generated 
              interest= compounded_amount *(oneLoan.interest_rate/100/12) *monthCompoundedOn
              compounded_amount+=interest
            }
          }
        

          return <LoanCard 
            id={oneLoan._id}
            edit={editLoan}
            delete={deleteLoan}

            name={oneLoan.name}
            amount={oneLoan.amount}
            interest_rate={oneLoan.interest_rate}
            due_in={oneLoan.term}
            life_time_cost={compounded_amount.toFixed(2)}
          />
          
})}

      <PersonalLoansChart 
        chartTitle={loanType} 
        paymentType="minimal"
        data={fakeDB}

    />
    </div>
  );
}

export default PersonalLoans;


/**
 * let amount=0,interest=0, principal=0;
        let n=0,r=0,t=0, counter=0;
        let monthly_interest_payment=[]
        let myObj=null;
        loans.map(oneLoan=>{
          // for each month see what is the interest and the new principle?
          // iterate over the loans and add the totals to the same loan Object
          // which months do we apply interest on?
          let compounding_months=oneLoan.compounding_period/12 // on these month.
          // how much interest is earner?
          interest=oneLoan.amount*oneLoan.interest_rate/100
          for(let x=0; x< oneLoan.term; i++){
              // term of 1 years thus compounded 2x per year
              // month 6 need a compound. 
              if(x % Math.round(compounding_months) == 0){
                  oneLoan.amount+=interest 
              }
          }
            myObj={
              x:counter,
              y:oneLoan.amount,
              principle: 11,
              interest:interest 
            }
            counter+=1
        })
      // how much dose it increment each month?
      // how much will the payment decrease it by?
      
 */






// import CanvasJSReact from '@canvasjs/react-charts';
// //var CanvasJSReact = require('@canvasjs/react-charts');

// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// var dataPoints = [];
// class PersonalLoans extends Component {
//   render() {
//     const options = {
//       animationEnabled: true,
//       exportEnabled: true,
//       theme: 'light2', // "light1", "dark1", "dark2"
//       title: {
//         text: 'Bounce Rate by Week of Year',
//       },
//       axisY: {
//         title: 'Bounce Rate',
//         includeZero: false,
//         suffix: '%',
//       },
//       axisX: {
//         title: 'Week of Year',
//         prefix: 'W',
//         interval: 2,
//       },
//       data: [
//         {
//           type: 'line',
//           toolTipContent: 'Week {x}: {y}%',
//           dataPoints: [
//             { x: 1, y: 64 },
//             { x: 2, y: 61 },
//             { x: 3, y: 64 },
//             { x: 4, y: 62 },
//             { x: 5, y: 64 },
//             { x: 6, y: 60 },
//             { x: 7, y: 58 },
//             { x: 8, y: 59 },
//             { x: 9, y: 53 },
//             { x: 10, y: 54 },
//             { x: 11, y: 61 },
//             { x: 12, y: 60 },
//             { x: 13, y: 55 },
//             { x: 14, y: 60 },
//             { x: 15, y: 56 },
//             { x: 16, y: 60 },
//             { x: 17, y: 59.5 },
//             { x: 18, y: 63 },
//             { x: 19, y: 58 },
//             { x: 20, y: 54 },
//             { x: 21, y: 59 },
//             { x: 22, y: 64 },
//             { x: 23, y: 59 },
//           ],
//         },
//       ],
//     };

//     return (
//       <div>
//         <h1>React Line Chart</h1>
//         <CanvasJSChart
//           options={options}
//           /* onRef={ref => this.chart = ref} */
//         />
//         {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
//       </div>
//     );
//   }
// }

// make the card here. // loan name and the loan amount, interest rate, left over amount. 
  // creaation vs rn what is the left over payment. 