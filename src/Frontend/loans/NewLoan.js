import React from 'react';
import { useFormik } from "formik";
import axios, {AxiosError} from "axios";
import { useNavigate } from 'react-router-dom';

function NewLoan() {
    const userEmail = () => {
        const value = `${document.cookie}`;
        const regex = /%22(.*)%22/g; // The actual regex
        const matches = regex.exec(value);
        const text =  matches[1];
        const textArray = text.split("%22:%22");
      
        return textArray[1];
      }
    const navigate = useNavigate();

    const onSubmit = async(values) => {
        console.log("Values: ", values);

        try {
        await axios.post(
            "http://localhost:3000/newloan",
            values,
            {
                headers: {"Access-Control-Allow-Origin": true}
            },
        );
        navigate("/");
        window.location.reload();

        } catch (err) {
        if (err && err instanceof AxiosError)
            setError(err.response?.data.message);
        else if (err && err instanceof Error)
            setError(err.message);
        
        console.log("Error: ", err);
        }
    };

        const formik = useFormik({
            initialValues: {
            email: userEmail(),
            type: "",
            expense: "",
            name: "",
            amount: "",
            interest_rate: "",
            term: "",
            compounding_period: "",
            },
            onSubmit,
        });

  return (
    <div className="form-container">
    <form onSubmit={formik.handleSubmit}>
      <div className="signup-form">
        <label htmlFor="type">Loan Type</label>
        <br />
        <select name="type" onChange={formik.handleChange} required>
            <option value="Personal">Personal Loan</option>
            <option value="Business">Business Loan</option>
            <option value="Car">Car Loan</option>
            <option value="Mortgage">Mortgage Loan</option>
            <option value="Consolidation">Consolidation Loan</option>
        </select>
        <br />
        <label htmlFor="expense">Expense</label>
        <br />
        <select name="expense" onChange={formik.handleChange} required>
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select>
        <br />
        <label htmlFor="name">Loan Name</label>
        <br />
        <input
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Loan Name"
          name="name"
          required
        />
        <br />
        <label htmlFor="amount">Amount</label>
        <br />
        <input
          type="number"
          value={formik.values.amount}
          onChange={formik.handleChange}
          placeholder="Amount"
          name="amount"
          required
        />
        <br />
        <label htmlFor="interest_rate">Interest Rate</label>
        <br />
        <input
          type="number"
          value={formik.values.interest_rate}
          onChange={formik.handleChange}
          placeholder="Interest Rate"
          name="interest_rate"
          required
        />
        <br />
        <label htmlFor="term">Term</label>
        <br />
        <input
          type="number"
          value={formik.values.term}
          onChange={formik.handleChange}
          placeholder="Term"
          name="term"
          required
        />
        <br />
        <label htmlFor="compounding_period">Compounding Period</label>
        <br />
        <input
          type="number"
          value={formik.values.compounding_period}
          onChange={formik.handleChange}
          placeholder="Compounding Period"
          name="compounding_period"
          required
        />
        <br />

        <button type="submit" className="signup-button">
          Create Loan
        </button>
      </div>
    </form>
  </div>
  );

}

export default NewLoan;
