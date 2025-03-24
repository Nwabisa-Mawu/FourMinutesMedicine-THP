import react from 'react'
import { Container, Box, AppBar, Toolbar } from "@mui/material";
import HeaderComponent from './components/Header.component'
// import Login from './pages/Login.page';
// import SignUp from './pages/SignUp.page';
// import CourseList from './pages/CourseList.page';
// import UserDashboardPage from './pages/UserDashboard.page';
// import CreateEditCoursePage from './pages/CreateeditCourse.page';
import AppRoutes from './Approuting.service';

const App = () => {
    return (
      <Box>
        {/* HEADER */}
        <HeaderComponent />
      {/* PAGE */}
        <Container sx={{ mt: 4 }}>
          <AppRoutes />
        </Container>
      </Box>
    );
  };
  
  export default App;

