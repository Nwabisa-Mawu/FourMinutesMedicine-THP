import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Alert, CircularProgress, Box } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContext.service";
// import { API } from "../utils/constant";
// import { setToken } from "../utils/helper";
import AuthForm from "../components/AuthForm.component";

const SignUp = () => {
//   const navigate = useNavigate();
//   const { setUser } = useAuthContext();

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({ username: "", email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     setError("");
//     try {
//       const response = await fetch(`${API}/auth/local/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await response.json();
//       if (data?.error) {
//         throw new Error(data?.error?.message || "Sign-up failed");
//       }
//       setToken(data.jwt);
//       setUser(data.user);
//       navigate("/profile", { replace: true });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
const signUpFields = {
  formName: "Sign Up",
  editFieldsArr: [
    { label: "Username", name: "username" },
    { label: "Email", name: "email" },
    { label: "Password", name: "password", type: "password" },
  ],
  submitBtn: { name: "Sign Up" },
  altLink: { text: "Already have an account?", linkName: "Login" },
}

  return (
    <AuthForm
      formName={signUpFields.formName}
      editFieldsArr={signUpFields.editFieldsArr}
      submitBtn={signUpFields.submitBtn}
      altLink={signUpFields.altLink} />
  );
};

export default SignUp;
