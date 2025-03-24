import React from "react";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useAuthContext } from "../context/AuthContext.service";
import { API } from "../utils/constants";
import { getToken } from "../utils/helpers";

import EditComponent from "../components/EditDetail.component";

const EditUserDialog = () => {
    const { user, setUser } = useAuthContext();
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    avatar_url: user?.avatar_url || ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data?.error) {
        throw new Error(data?.error?.message || "Update failed");
      }
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    const userEditFields = {
        //TODO: make dynamic
        editTypeName: "Edit User",
        editFieldsArr: [
            { label: "Username", name: "username" },
            { label: "Email", name: "email" },
            { label: "Password", name: "password", type: "password" }
        ],
        hasImgUpload: true,
        imageData: { imgName: "User Image", name: "userImg" },
        //TODO: add fnc for cancelling edit
        modalCtrlBtnsArr: [
            { label: "Update", color: "primary", isSubmit: true },
            { label: "Cancel", color: "error", isSubmit: false},
        ],
    };

    return (
        <EditComponent 
            editTypeName={userEditFields.editTypeName}
            editFieldsArr={userEditFields.editFieldsArr}
            hasImgUpload={userEditFields.hasImgUpload}
            imageData={userEditFields.imageData}
            modalCtrlBtnsArr={userEditFields.modalCtrlBtnsArr}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            />
    )
}

export default EditUserDialog;