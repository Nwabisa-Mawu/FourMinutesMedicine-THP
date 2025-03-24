import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../utils/context/AuthContext.service";
import { API } from "../utils/constants";
import { getToken } from "../utils/helpers";
import EditComponent from "../components/EditDetail.component";

const CreateEditCoursePage = () => {
  const { user } = useAuthContext();
  const [form, setForm] = useState({
    coursename: "",
    course_description: "",
    course_price: "",
    course_image: "",
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
      //TODO: needs to fetch one course at a time
      const response = await fetch(`${API}/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({data: { 
            coursename: form.coursename,
            course_description: form.course_description,
            course_price: form.course_price,
            course_image: form.course_image ? form.course_image : null,
            // location: "en",
            user_code: {
                  connect: [{ id: user.id }]
            } 
          }}),
      });
      const data = await response.json();
      if (data?.error) {
        throw new Error(data?.error?.message || "Update failed");
      }
      // setCourses((prevCourses) => [...prevCourses, data.data]);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const editCourses = {
    editTypeName: "Add Course",
    editFieldsArr: [
      { label: "Course Name", name: "coursename" },
      { label: "Course Description", name: "course_description", row: 4 },
      { label: "Course Price", name: "course_price" },
    ],
    hasImgUpload: true,
    imageData: {
      name: "course_image",
      imgName: "Course Image",
    },
    modalCtrlBtnsArr: [
      { type: "submit", label: "Create", color:"primary" , isSubmit: true},
      { type: "button", label: "Cancel", color:"error", onClick: () => navigate("/dashboard")}
    ],
  };

  return (
    <>
      <EditComponent 
      editTypeName={editCourses.editTypeName}
      editFieldsArr={editCourses.editFieldsArr}
      hasImgUpload={editCourses.hasImgUpload}
      imageData={editCourses.imageData}
      modalCtrlBtnsArr={editCourses.modalCtrlBtnsArr}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      form={form}
      error={error}
      />
    </>
  );
};

export default CreateEditCoursePage;
