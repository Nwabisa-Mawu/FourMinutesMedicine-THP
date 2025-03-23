import React from "react";
import { Card, CardContent, Typography, TextField, Button, Alert,  CircularProgress, Box } from "@mui/material";
import AuthForm from "../components/AuthForm.component";

const Login = () => {
  const loginFields = {
    formName: "Login",
    editFieldsArr: [
      { label: "Email", name: "email" },
      { label: "Password", name: "password", type: "password" },
    ],
    submitBtn: { name: "Login" },
    altLink: { text: "Forgot Password?", linkName: "Reset Password" },
  }

  return (
    <AuthForm 
      formName={loginFields.formName}
      editFieldsArr={loginFields.editFieldsArr}
      submitBtn={loginFields.submitBtn}
      altLink={loginFields.altLink}/>
  );
};

export default Login;
