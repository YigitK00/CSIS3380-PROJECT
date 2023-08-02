import React from 'react';

const userEmail = () => {
  if (document.cookie) {
    const value = `${document.cookie}`;
    const regex = /%22(.*)%22/g; // The actual regex
    const matches = regex.exec(value);
    const text =  matches[1];
    const textArray = text.split("%22:%22");

    return ", " + textArray[1] + "!";
  } else {
    return "!";
  }
}

const Home = () => (
  <div >
    <p>Welcome Back{userEmail()}</p>
  </div>
);

export default Home;