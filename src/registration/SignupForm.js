import React from 'react';

const SignupForm = () => (
  <div className="form-container">
    <form>
      <div className="signup-form">
        <label for="email">Email</label>
        <input type="text" placeholder="Enter Email" name="email" required />

        <label for="password">Password</label>
        <input
          type="text"
          placeholder="Enter Password"
          name="password"
          required
        />

        <label for="password-repeat">Repeat Password</label>
        <input
          type="text"
          placeholder="Repeat Password"
          name="password-repeat"
          required
        />

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </div>
    </form>
  </div>
);

export default SignupForm;
