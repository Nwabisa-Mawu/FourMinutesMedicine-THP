import { useState } from 'react'
import HeaderComponent from './components/Header.component'
import Login from './pages/Login.page';
import SignUp from './pages/SignUp.page';
import CourseList from './pages/CourseList.page';
import CourseEdit from './pages/CreateEditCourse.dialog.page';
import EditUserDialog from './pages/EditUser.dialog.page';


function App() {

  return (
    <>
    <HeaderComponent />
    {/* <Login /> */}
    {/* <SignUp /> */}
    {/* <CourseList /> */}
    {/* <CourseEdit /> */}
    <EditUserDialog />
    </>
  )
}

export default App
