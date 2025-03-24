import react from 'react'
import { Container, Box, AppBar, Toolbar } from "@mui/material";
import HeaderComponent from './components/Header.component'
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

