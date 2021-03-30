import React from "react";
import FormSignin from "../components/Forms/FormSignin";

const Signin = (props) => {
  return (
    <div className="flex Auth-container">
      <h2>Connect to your account</h2>
      <FormSignin />
    </div>
  )
};

export default Signin;
