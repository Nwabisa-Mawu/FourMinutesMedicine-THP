import React from "react";
import { Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
// import { useAuthContext } from "../context/AuthContext.service";
// import { API } from "../utils/constant";
// import { getToken } from "../utils/helper";
import EditModal from "../components/EditModal.component";

const CourseEdit = () => {
  const editCourses = {
    editTypeName: "Edit Course",
    editFieldsArr: [
      { label: "Course Name", name: "coursename" },
      { label: "Course Description", name: "coursedescription", row: 4 },
      { label: "Course Price", name: "course_price" },
    ],
    hasImgUpload: true,
    imageData: {
      name: "course_image",
      imgName: "Course Image",
    },
    modalCtrlBtnsArr: [
      { type: "submit", label: "Create", color:"primary" , isSubmit: true},
      { type: "button", label: "Delete", color:"error"}
    ],
  };
//   const { user, setUser } = useAuthContext();
//   const [form, setForm] = useState({
//     coursename: "",
//     coursedescription: "",
//     course_price: "",
//     course_image: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch(`${API}/courses/${user.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${getToken()}`,
//         },
//         body: JSON.stringify(form),
//       });
//       const data = await response.json();
//       if (data?.error) {
//         throw new Error(data?.error?.message || "Update failed");
//       }
//       setUser(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <>
      <EditModal 
      editTypeName={editCourses.editTypeName}
      editFieldsArr={editCourses.editFieldsArr}
      hasImgUpload={editCourses.hasImgUpload}
      imageData={editCourses.imageData}
      modalCtrlBtnsArr={editCourses.modalCtrlBtnsArr}
      />
    </>
  );
};

export default CourseEdit;
