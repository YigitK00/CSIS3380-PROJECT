import React from 'react';

const LoginForm = () => (
  <div className="form-container">
    <form>
      <div className="login-form">
        <label for="username">Username</label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />
        <label for="password">Password</label>
        <input
          type="text"
          placeholder="Enter Password"
          name="password"
          required
        />

        <button type="submit" className="login-button">
          Login
        </button>
        <label>
          <input type="checkbox" checked="checked" name="remember" />
          Remember me
        </label>
      </div>
    </form>
  </div>
);

export default LoginForm;
