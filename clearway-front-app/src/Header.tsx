import React from "react";
import CountdownTimer from "./CountDownTimer.tsx";

const Header = () => {


  return (
    <>
      <h1 className="title" style={{ textAlign: "center", margin: "20px 0" }}>
        Clear Way
      </h1>
      <div>
        <CountdownTimer />
      </div>
 
    </>
  );
};

export default Header;
