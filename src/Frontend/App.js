import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import About from './navigation/About';
import Contact from './navigation/Contact';
import Support from './navigation/Support';

import LoginForm from './registration/LoginForm';
import RegisterForm from './registration/RegisterForm';
import PersonalLoans from './navigation/PersonalLoans';
import { RequireAuth } from 'react-auth-kit';

const App = () => (
  <div className="wrapper">
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/support" element={<Support />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/personal-loans" element={<RequireAuth><PersonalLoans /></RequireAuth>} />
      {/* <Route path="/business-loans" element={<RequireAuth><BusinessLoans /></RequireAuth>} />
      <Route path="/car-loans" element={<RequireAuth><CarLoans /></RequireAuth>} />
      <Route path="/mortgage-loans" element={<RequireAuth><MortgageLoans /></RequireAuth>} />
      <Route path="/consolidation-loans" element={<RequireAuth><ConsolidationLoans /></RequireAuth>} /> */}
    </Routes>
  </div>
);

export default App;
