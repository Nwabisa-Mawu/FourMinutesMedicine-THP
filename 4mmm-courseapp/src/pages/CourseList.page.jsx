import React, { useEffect ,useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useAuthContext } from "../utils/context/AuthContext.service";
import CourseCard from "../components/CourseCard.component"; // Import the CourseCard component
import { API } from "../utils/constants";
import { getToken } from "../utils/helpers";
import "./css/pages.css";

const CourseList = () => {
  const { user, setUser } = useAuthContext();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  
  const url = `${API}/api/courses?filters[user_code][id][$eq]=${user.id}`;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = await response.json();
        //why +1 on db-course id??
        setCourses(data.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const goToAddCourse = () => {
    navigate("/add-course", { replace: true })
  }

  const deleteFnc = async (documentId) => {
    try {
      const response = await fetch(`${API}/api/courses/${documentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (response.ok) {
      // Only attempt to parse JSON if there's content to parse
      let data = null;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json") && response.status !== 204) {
        data = await response.json();
      }
      
      // Update the state regardless of response data
      const newCourses = courses.filter((course) => course.documentId !== documentId);
      setCourses(newCourses);
      return true;
      } else {
      console.error("Failed to delete course:", response.statusText);
      return false;
    }

    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }

  const goToEditFnc = (documentId) => {
    navigate(`/edit-course/${documentId}`, { replace: true })
  }

  return (
    <>
    { courses && courses.length ?
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {courses.map((course) => (
        <CourseCard key={course.id} imgUrl={course.course_image} 
          altTxt="Hello" courseName={course.coursename} courseDesc={course.course_description}
          coursePrice={course.course_price} deleteFnc={() => deleteFnc(course.documentId)}  editFnc={() => goToEditFnc(course.documentId)} />
      ))}
    </Box>
   : <div className="call-to-action">
        <Button       
                  variant="contained" 
                  color="secondary" 
                  sx={{ mr: 2 }}
                  startIcon={<AddIcon />}
                  onClick={goToAddCourse}
                >
                  Create a course
                </Button>
    </div>
    }
    </>
  );
};

export default CourseList;
