import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../utils/context/AuthContext.service";
import { API } from "../utils/constants";
import { getToken } from "../utils/helpers";
import EditComponent from "../components/EditDetail.component";

const EditCoursePage = () => {
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
  //get id from url query params
  const { coursename } = useParams();
  const url = `${API}/api/courses?filters[user_code][id][$eq]=${user.id}&filters[coursename][$eq]=${coursename}`;

  //fetch course data
    useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
        
        const data = await response.json();
        
        if (data?.error) {
          throw new Error(data?.error?.message || "Failed to fetch course");
        }
        
        // Extract the attributes and set the form state
        const courseData = data.data[0];
        localStorage.setItem("courseID", parseInt(courseData.id)-1);
        setForm({
          coursename: courseData.coursename || "",
          course_description: courseData.course_description || "",
          course_price: courseData.course_price || "",
          course_image: courseData.course_image?.data?.id || "",
        });
        } catch (err) {
            setError(err.message);
            console.error("Error fetching course:", err);
        } finally {
            setLoading(false);
        }
        };
        if (coursename) {
        fetchCourse();
        }
    }, [coursename]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const id = localStorage.getItem("courseID");
    try {
      const response = await fetch(`${API}/api/courses/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          data: { 
            coursename: form.coursename,
            course_description: form.course_description,
            course_price: form.course_price,
            course_image: form.course_image ? form.course_image : null,
            user_code: {
              connect: [{ id: user.id }]
            } 
          }
        }),
      });
      
      const data = await response.json();
      
      if (data?.error) {
        throw new Error(data?.error?.message || "Update failed");
      }
      
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const editCourses = {
    editTypeName: "Edit Course",
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
      { type: "submit", label: "Update Course", color:"primary" , isSubmit: true},
      { type: "button", label: "Cancel Update", color:"error", onClick: () => navigate("/dashboard")}
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

export default EditCoursePage;
