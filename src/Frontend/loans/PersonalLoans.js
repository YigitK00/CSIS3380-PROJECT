import React, { Component, useState } from 'react';
import axios, { all } from "axios";
import LoanCard from '../Util/LoanCard';
  
import CanvasJSReact from '@canvasjs/react-charts';


let fakeDB=[
  {"email":"ryarwood0@ed.gov","type":"","expense":false,"name":"personal loan","amount":100,"interest_rate":5,"term":12,"compounding_period":2},
  {"email":"dstill1@examiner.com","type":"","expense":false,"name":"personal loan","amount":100,"interest_rate":7,"term":12,"compounding_period":3},
  {"email":"zjorio9@g.co","type":"","expense":true,"name":"personal loan","amount":200,"interest_rate":5,"term":44,"compounding_period":3}
]



// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PersonalLoansChart extends Component {
  render() {
    const {chartTitle, paymentType, data } = this.props;
    let options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'light2', // "light1", "dark1", "dark2"
      title: {
        // text: 'se the titile of the chart ',
        // text: 'se the titile of the chart ',
      },

      axisY: {
        title: 'Principle ',
        includeZero: false,
        prefix: '$',
      },

      axisX: {
        title: 'Months of Year',
        prefix: 'M',
        interval: 2,
      },

      data: [
        {
          type: 'line',
          toolTipContent: 'Month {month}: principle {y} interest {total_interest} ',
          dataPoints: [],
        },

      ],
      // let loan_one_month={month:0 , total_principle:0, total_interest:0}


    };

    // I deal with the given the proper data into the chart
    let _monthlyCanAfford=0
    let monthlyCanAfford=(amount)=>{
      console.log(amount);
      _monthlyCanAfford=amount;
    }

    let setUpandAddData=(loans, monthlyCanAfford)=>{
    
      let all_loans_combined=[]
      let loan_one_month={month:0 , y:0, total_interest:0}

      let longest=0; // i++
      let loan_instance=0
      let counter=0
      loans.map(loan=>{
        if(loan.term >longest){
          longest=loan.term
          loan_instance=counter
        }
        counter+=1
      })
      for(let i=0; i<loans[loan_instance].term; i++){ 
          all_loans_combined.push({...loan_one_month} )
      } 

      let previous_loan_amout=0
      counter=0
      loans.map(loan=>{
        loan_one_month={month:0 , y:0, total_interest:0}


        let monthCompoundedOn=Math.round(12/loan.compounding_period)
        let interest=0
        for(let month=0; month<loan.term ;month++){
          if( (month+1) % monthCompoundedOn ==0 ){ // interest is generated 
            interest= loan.amount *(loan.interest_rate/100/12) *monthCompoundedOn
            loan.amount+=interest
          }
          if(counter!=0){
              all_loans_combined[month].y =previous_loan_amout
          }
          all_loans_combined[month].month=month
          all_loans_combined[month].y+=loan.amount
          all_loans_combined[month].total_interest+=interest
        }  
        previous_loan_amout+=loan.amount
        counter+=1        

      })
      


      all_loans_combined.map(loan=>{options.data[0].dataPoints.push(loan)})
  }


  return (
      <div class="chart">
        {
        }

        <h1>Weeks to pay off {chartTitle} Loan</h1>
        <h4>Using {paymentType} Payment</h4>


        {/* <AffordMonthly
          monthlyCanAfford={monthlyCanAfford}
        /> */}


        {
          setUpandAddData(data, monthlyCanAfford)
          // i set up the data for the graph
        }
        <CanvasJSChart
          options={options}
          

/>
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

let AffordMonthly=(prop)=>{
  return (
    <form>
        <label >How much can you afford monthly </label>
        <input type="number" id="amount" placeholder='250'></input>
        <button type='submit'
        onClick={()=>{
          prop.monthlyCanAfford(
            document.getElementById("amount").value
          )
        }}
        >Update chart</button>
    </form>
  )
}

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
    window.location = '/update/' + id;
  };

  let numCard=0;

  return (
  <div  class="container">
      {
      fakeDB.map(oneLoan=>{
          let _amount= Math.round( ((oneLoan.interest_rate/100/12*oneLoan.compounding_period)*oneLoan.amount)+oneLoan.amount) ; 
          numCard+=1

          return <LoanCard 
            id={oneLoan._id}
            edit={editLoan}
            delete={deleteLoan}

            name={oneLoan.name}
            amount={oneLoan.amount}
            interest_rate={oneLoan.interest_rate}
            due_in={oneLoan.term}
            life_time_cost={_amount}
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