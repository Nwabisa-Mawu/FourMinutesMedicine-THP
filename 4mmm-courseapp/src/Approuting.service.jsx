import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { getToken } from "./utils/helpers";
import { useAuthContext } from "./utils/context/AuthContext.service";
import Login from "./pages/Login.page";
import SignUp from "./pages/SignUp.page";
import CourseList from "./pages/CourseList.page";
import CreateEditCoursePage from "./pages/CreateeditCourse.page";
import EditCoursePage from "./pages/EditCourse.page";
import EditUserPage from "./pages/EditUser.page";

const AppRoutes = () => {
    const { user } = useAuthContext();

    return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={user ? <CourseList /> : <Navigate to="/login" replace />} />
      <Route path="/add-course" element={user ? <CreateEditCoursePage /> : <Navigate to="/login" replace />} />
      <Route path="/edit-course/:documentId" element={user ? <EditCoursePage /> : <Navigate to="/login" replace />} />
      <Route path="/edit-user" element={user ? <EditUserPage /> : <Navigate to="/login" replace />} />
    </Routes>
    );
};

export default AppRoutes;