import React, { Component, useState } from 'react';
import axios, { all } from "axios";
import LoanCard from '../Util/LoanCard';
  
import CanvasJSReact from '@canvasjs/react-charts';


let fakeDB=[
  {"email":"ryarwood0@ed.gov","type":"","expense":false,"name":"personal loan","amount":3242,"interest_rate":5,"term":21,"compounding_period":10},
  {"email":"dstill1@examiner.com","type":"","expense":false,"name":"personal loan","amount":4330,"interest_rate":4,"term":32,"compounding_period":7},
  {"email":"zjorio9@g.co","type":"","expense":true,"name":"personal loan","amount":4883,"interest_rate":5,"term":44,"compounding_period":9}
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
        title: 'Bounce Rate',
        includeZero: false,
        suffix: '%',
      },

      axisX: {
        title: 'Week of Year',
        prefix: 'W',
        interval: 2,
      },

      data: [
        {
          type: 'line',
          toolTipContent: 'Month {x}: {y} = {interest}-I {principle}-P',
          dataPoints: [],
        },
      ],


    };


    // I deal with the given the proper data into the chart
    let _monthlyCanAfford=0
    let monthlyCanAfford=(amount)=>{
      console.log(amount);
      _monthlyCanAfford=amount;
    }



    let setUpandAddData=(loans, monthlyCanAfford)=>{
      // assuming minimal payment is 10%
      // show the growth of the loans. 
     
      // what is the total loan amount?
      //https://www.bing.com/images/search?view=detailV2&ccid=ov9ThjfK&id=E9A7704E8F137EC650934CD9228A5E22BF86E49F&thid=OIP.ov9ThjfKlENZ7ZPeUBsU0AHaFj&mediaurl=https%3a%2f%2fwww.wikihow.com%2fimages%2fthumb%2f4%2f4c%2fCalculate-Bank-Interest-on-Savings-Step-2-Version-5.jpg%2faid1403590-v4-728px-Calculate-Bank-Interest-on-Savings-Step-2-Version-5.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.a2ff538637ca944359ed93de501b14d0%3frik%3dn%252bSGvyJeiiLZTA%26pid%3dImgRaw%26r%3d0&exph=546&expw=728&q=what+is+the+formula+for+compound+interest&simid=608050366173242587&FORM=IRPRST&ck=6EA9BBB14923FE3CDE91FC75F520FAD6&selectedIndex=0&idpp=overlayview&ajaxhist=0&ajaxserp=0
        

      //data_for_one_loan
      // loans.map(loan=>{
        // {month:1 total_principle: interest: }
        // {month:2 total_principle: interest: }
          // loan 1 compounds every 2 months so new month 2 
          // {month:2 total_principle: total_principle+=loan.amount interest }
          // "but the interest earned is based on the old principle"
            // newPrince= oldPrince + oldPrince*oneLoan.interestrate/100
            
          //for (let i=0; i< loan.term; i++){
            // 44 months there will be gaps..   { null } .. set it with the existing values
              // if( month of compound){ // i:5    month..:4 month % i ==0
              // list_of_months[month of compound-1]. total_principle+= interest 
              // list_of_months[month of compound-1]. interest= interest 
            // }
          // }else{
            //use previous entry
          // }

          //data_for_one_loan.map(loan=>{ add the values together.  })
          // each month i make the minimal payment. 
        // })
    
  // algorithm to implement. 

  let all_loans_combined=[]
  let loan_one_month={month:0 , total_principle:0, total_interest:0}

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
    // populate all_loans_combined with the length of the longest loan.term


  loans.map(loan=>{
    //reset the values for new loan
    loan_one_month={month:0 , total_principle:0, total_interest:0}

    for(let i=0; i<loan.term; i++){
      // month thats being compounded on 
      if( Math.floor(loan.compounding_period/12) % i ==0){

        //     //first loan in sequence
        if(all_loans_combined[i].total_principle ==0 ||i ==0){
          console.log(22222)

            loan_one_month.month=i
            loan_one_month.total_principle=loan.amount
            loan_one_month.total_interest=loan.interest_rate/100* loan.amount

            all_loans_combined[i]=({...loan_one_month})
          }
          else{
            // add the new values to the old as the loan compounds
            loan_one_month.month=i
            console.log(11111111)

            let _interest =loan_one_month.total_principle* loan.interest_rate/100
            loan_one_month.total_interest +=  _interest
            loan_one_month.total_principle=  loan_one_month.total_principle +_interest

            all_loans_combined[i]=({...loan_one_month})
          }
      }
    }
  })
  
  console.log(all_loans_combined)
  

      options.data[0].dataPoints.push
      (
        // { x: 1, y: principal+interest, principle: 11, interest:11 },
        { x: 2, new_total: 61 },
        { x: 3, y: 64 },
        { x: 4, y: 62 },
        { x: 5, y: 64 },
        { x: 5, y: 5 },
        // {x: 6, y:(3377+4431+5066)}
      )
      // toolTipContent: 'Month {x}: {new_total} = {interest}-I {principle}-P',
    }

    return (
      <div class="chart">
        {
        }

        <h1>Weeks to pay off {chartTitle} Loan</h1>
        <h4>Using {paymentType} Payment</h4>

        {
          // format of the data 
          // dataPoints: [
          //   { x: 1, y: 64 },
          // data[0].amount
        
        }


        <AffordMonthly
          monthlyCanAfford={monthlyCanAfford}
        />


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