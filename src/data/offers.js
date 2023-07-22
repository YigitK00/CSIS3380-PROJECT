const loan=require("../CRUDS/loan_type.crud")

const offerList=[]
loan.getAllLoans().then((data)=>{
  data.map(loan=>{
    offerList.push(
      {
        productName:loan.loan_type,
        id: loan.id
      })
  })
})
.catch((err)=>{console.log(err)})
// idk if this works its not being updated on the screen

module.exports= offerList;

// export const offerList = [
//   {
//     productName: 'Personal Loans',
//     id: 1,
//   },
//   {
//     productName: 'Business Loans',
//     id: 2,
//   },
//   {
//     productName: 'Car Loans',
//     id: 3,
//   },
//   {
//     productName: 'Mortgage Loans',
//     id: 4,
//   },
//   {
//     productName: 'Consolidation Loans',
//     id: 5,
//   },
  
// ];

