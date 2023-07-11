import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Support from './Support';

const App = () => (
  <div className="wrapper">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/support" element={<Support />} />
    </Routes>
  </div>
);

export default App;
