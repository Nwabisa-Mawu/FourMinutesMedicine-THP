import React from "react";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuthContext } from "../utils/context/AuthContext.service";
import { API } from "../utils/constants";
import { setToken, getToken } from "../utils/helpers";
import AuthForm from "../components/AuthForm.component";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: form.email, password: form.password }),
      });
      const data = await response.json();
      if (data?.error) {
        throw new Error(data?.error?.message || "Login failed");
      }
      setToken(data.jwt);
      setUser(data.user);

      // Ensure token is set before navigating
      // setTimeout(() => {
      // if (getToken()) {
      //   navigate("/dashboard", { replace: true });
      // }
      // }, 1000);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const loginFields = {
    formName: "Login",
    editFieldsArr: [
      { label: "Email", name: "email" },
      { label: "Password", name: "password", type: "password" },
    ],
    submitBtn: { name: "Login" },
    altLink: { text: "Forgot Password?", linkName: "Reset Password", pathName: "/reset-password" },
  }

  return (
    <AuthForm 
      formName={loginFields.formName}
      editFieldsArr={loginFields.editFieldsArr}
      submitBtn={loginFields.submitBtn}
      altLink={loginFields.altLink}
      handleSubmit={onSubmit}
      handleChange={handleChange}
      error={error}
      isLoading={isLoading}
      form={form}/>
  );
};

export default Login;
