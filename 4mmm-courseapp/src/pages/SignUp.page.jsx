import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuthContext } from "../utils/context/AuthContext.service";
import { API } from "../utils/constants";
import { setToken } from "../utils/helpers";
import AuthForm from "../components/AuthForm.component";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API}/api/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data?.error) {
        throw new Error(data?.error?.message || "Sign-up failed");
      }
      setToken(data.jwt);
      setUser(data.user);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
const signUpFields = {
  formName: "Sign Up",
  editFieldsArr: [
    { label: "Username", name: "username" },
    { label: "Email", name: "email" },
    { label: "Password", name: "password", type: "password" },
  ],
  submitBtn: { name: "Sign Up" },
  altLink: { text: "Already have an account?", linkName: "Login", pathName: "/login" },
}

  return (
    <AuthForm
      formName={signUpFields.formName}
      editFieldsArr={signUpFields.editFieldsArr}
      submitBtn={signUpFields.submitBtn}
      altLink={signUpFields.altLink}
      handleSubmit={onSubmit}
      handleChange={handleChange}
      error={error}
      isLoading={isLoading}
      form={form} />
  );
};

export default SignUp;
