import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import About from './navigation/About';
import Contact from './navigation/Contact';
import Support from './navigation/Support';

import LoginForm from './registration/LoginForm';
import SignupForm from './registration/SignupForm';

const App = () => (
  <div className="wrapper">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/support" element={<Support />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/sign-up" element={<SignupForm />} />
    </Routes>
  </div>
);

export default App;
