import React, { Component, useState } from 'react';
import axios from "axios";
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
          toolTipContent: 'Week {x}: {y}%',
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
     
     
     
     
     
      options.data[0].dataPoints.push
      (
        { x: 1, y: 64 },
        { x: 2, y: 61 },
        { x: 3, y: 64 },
        { x: 4, y: 62 },
        { x: 5, y: 64 },
        { x: 5, y: 5 },
        {x: 6, y:_monthlyCanAfford}
      )

    }




    return (
      <div class="chart">
        <h1>Weeks to pay off {chartTitle} Loan</h1>
        <h4>Using {paymentType} Payment</h4>

        {
          // format of the data 
          // dataPoints: [
          //   { x: 1, y: 64 },
          data[0].amount
        
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
      .delete('http://localhost:4000/delete/' + id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

      window.location.reload();

    // setTodoList(todos.filter((el) => el._id !== id));
  };

  const editLoan = (id) => {
    window.location = '/update/' + id;
  };

  let numCard=0;

  return (
  <div  class="container">
      i am here 
      <br/>
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