import React from "react";
import FormSignup from "../components/Forms/FormSignup";

const Signup = (props) => {
  return (
    <div className="flex Auth-container">
      <h2>Create your account</h2>
      <FormSignup />
    </div>
  )
};

export default Signup;
