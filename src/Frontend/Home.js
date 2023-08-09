import React, { useState } from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import LoanCard from './Util/LoanCard';

const LoansDashboard = () => {
  const userEmail = () => {
    const value = `${document.cookie}`;
    const regex = /%22(.*)%22/g; // The actual regex
    const matches = regex.exec(value);
    const text = matches[1];
    const textArray = text.split('%22:%22');

    return textArray[1];
  };

  const [loans, setLoans] = useState([]);
  useState(() => {
    axios
      .get(`https://ajax-api-qzf9.onrender.com/${userEmail()}`)
      .then(res => {
        setLoans(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteLoan = id => {
    axios
      .delete('https://ajax-api-qzf9.onrender.com/' + id)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });

    setLoans(loans.filter(loan => loan._id !== id));
  };

  const editLoan = id => {
    window.location = '/' + id;
  };

  const hideLoan = (id) => {
    setLoans(loans.filter((loan) => loan._id !== id));
  }

  if (loans.length > 0) {
    return (
      <div className="homepage">
        <h1 className="heading">Welcome Back, {userEmail()}!</h1>
        <br />
        <h1 className="heading">Here are your loans and investments</h1>
        <div>
          {loans.map(oneLoan => {
            let _amount = Math.round(
              (oneLoan.interest_rate / 100 / 12) *
                oneLoan.compounding_period *
                oneLoan.amount +
                oneLoan.amount
            );

            return (
              <LoanCard
                id={oneLoan._id}
                edit={editLoan}
                delete={deleteLoan}
                hide={hideLoan}
                name={oneLoan.name}
                amount={oneLoan.amount}
                interest_rate={oneLoan.interest_rate}
                due_in={oneLoan.term}
                life_time_cost={_amount}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="main-content home">
        <h1 className="heading">Welcome Back, {userEmail()}!</h1>
        <br />
        <h2>You don't have any loans or investments</h2>
      </div>
    );
  }
};

function Home() {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();

  if (auth) {
    return <LoansDashboard />;
  } else {
    return (
      <div className="main-content home">
        <h1 className="heading welcome">Welcome to Loanwolf!</h1>
        <br />
        <h2>Additional business info</h2>
      </div>
    );
  }
}
export default Home;
