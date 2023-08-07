import React from 'react';

const About = () => (
  <div>
    <div class="about-section">
      <h1>About the Loanwolf Team</h1>
      <p>Loanwolf is a team of passionate developers aim to develop a convenient solutions for users to keep track of their loans and investments.</p>
    </div>

    <h2 class="about-heading">Our Team</h2>
    <div class="row">
      <div class="column">
        <div class="card">
          <img class="about-img" src="/Bill.jpg" alt="Bill"/>
          <div class="container">
            <h2>Bill Nguyen</h2>
            <p class="title">Back End Developer</p>
            <p>Bill is a passionate software engineer who specializes in server-side engineering.</p>
            <p>bill@loanwolf.com</p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img class="about-img" src="/Bill.jpg" alt="Bill"/>
          <div class="container">
            <h2>Cristi</h2>
            <p class="title">Database Engineer and Loans Specialist</p>
            <p>Cristi is a visionary loans specialist who brought the idea to life and managed the databases.</p>
            <p>cristi@loanwolf.com</p>
            <p><button class="button">Contact</button></p>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="card">
          <img class="about-img" src="/Bill.jpg" alt="Bill"/>
          <div class="container">
            <h2>Yigit</h2>
            <p class="title">Front End Developer</p>
            <p>Yigit is Loanwolf's client-side wizard who is responsible for beautiful UIs and intuitive user experience.</p>
            <p>yigit@loanwolf.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
