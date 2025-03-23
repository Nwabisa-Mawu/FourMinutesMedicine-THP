import React, { useEffect ,useState } from "react";
import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import CourseCard from "../components/CourseCard.component"; // Import the CourseCard component
// import { API } from "../utils/constant"; // Adjust based on your API import
import "./css/pages.css";

const CourseList = () => {
  const [courses, setCourses] = useState([
    {
      imgUrl: "https://source.unsplash.com/random",
      altTxt: "course image",
      courseName: "Course Name",
      courseDesc: "Course Description", 
      coursePrice: "Course Price",
    }
  ]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API}/courses`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
    { courses && courses.length ?
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {courses.map((course) => (
        <CourseCard key={course.id} {...course} />
      ))}
    </Box>
   : <div className="call-to-action">
        <Button       
                  variant="contained" 
                  color="secondary" 
                  sx={{ mr: 2 }}
                  startIcon={<AddIcon />}
                >
                  Create a course
                </Button>
    </div>
    }
    </>
  );
};

export default CourseList;
