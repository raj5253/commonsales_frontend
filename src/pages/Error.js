import React from "react";

const Error = (props) => {
  const mssg = props?.mmsg;
  console.log(mssg);
  return (
    <div>
      <h1> Error</h1>
      <p>You got an error. diffrent status = {} </p>
    </div>
  );
};

export default Error;
