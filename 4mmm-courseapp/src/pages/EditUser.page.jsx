import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../utils/context/AuthContext.service";
import { API } from "../utils/constants";
import { getToken } from "../utils/helpers";
import EditComponent from "../components/EditDetail.component";

const EditUserPage = () => {
    const { user, setUser } = useAuthContext();
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    avatar_url: user?.avatar_url || ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API}/api/users/${user.id}`, {
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
      navigate("/dashboard", { replace: true })
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    const userEditFields = {
        editTypeName: "Edit User",
        editFieldsArr: [
            { label: "Username", name: "username" },
            { label: "Email", name: "email" },
            { label: "Password", name: "password", type: "password" }
        ],
        hasImgUpload: true,
        imageData: { imgName: "User Image", name: "userImg" },
        modalCtrlBtnsArr: [
            { label: "Update", color: "primary", isSubmit: true },
            { label: "Cancel", color: "error", isSubmit: false, onClick: () => navigate("/dashboard", { replace: true }) },
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
            form={form}
            error={error}
            />
    )
}

export default EditUserPage;