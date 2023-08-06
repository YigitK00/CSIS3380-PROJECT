import React from 'react';

function Home() {
  const userEmail = () => {
    if (document.cookie) {
      const value = `${document.cookie}`;
      const regex = /%22(.*)%22/g; // The actual regex
      const matches = regex.exec(value);
      const text = matches[1];
      const textArray = text.split('%22:%22');

      return ', ' + textArray[1] + '!';
    } else {
      return '!';
    }
  };
  return (
    <div className="main-content home">
      <h1 className="heading">Welcome Back{userEmail()}</h1>
    </div>
  );
}

export default Home;
