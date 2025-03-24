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
    course_image: null, // Store file instead of URL
    existing_image_id: null, // Store existing image ID
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { documentId } = useParams();

  const url = `${API}/api/courses/${documentId}?populate=course_image`;

  // Fetch course data
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

        const courseData = data.data;
        setForm({
          coursename: courseData?.coursename || "",
          course_description: courseData?.course_description || "",
          course_price: courseData?.course_price || "",
          course_image: null, 
          existing_image_id: courseData?.course_image?.id || null, 
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (documentId) fetchCourse();
  }, [documentId]);

  // Handle text inputs & file upload
  const handleChange = (e) => {
    if (e.target.name === "course_image") {
      setForm({ ...form, course_image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Upload image to Strapi
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch(`${API}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data && data.length > 0) {
        return data[0].id; // return uploaded image ID
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
      setError("Failed to upload image");
      return null;
    }
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      let uploadedImageId = form.existing_image_id; // Default to existing image
      if (form.course_image) {
        uploadedImageId = await handleImageUpload(form.course_image);
      }

      const response = await fetch(`${API}/api/courses/${documentId}`, {
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
            course_image: uploadedImageId ? [uploadedImageId] : [], // Attach image ID
            user_code: {
              connect: [{ id: user.id }],
            },
          },
        }),
      });

      const data = await response.json();
      if (data?.error) throw new Error(data?.error?.message || "Update failed");

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
