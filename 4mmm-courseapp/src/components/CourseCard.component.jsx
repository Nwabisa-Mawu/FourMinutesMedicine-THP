import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Card,CardContent,CardMedia,IconButton, Typography } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const CourseCard = (props) => {
  const { imgUrl, altTxt, courseName, courseDesc, coursePrice, deleteFnc, editFnc } = props;
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }}>
         <CardMedia
        component="img"
        sx={{ width: 140 }}
        image={imgUrl}
        alt={altTxt}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {courseName}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
           {courseDesc}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
           {coursePrice}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous" onClick={deleteFnc}>
            {theme.direction === 'rtl' ? <DeleteIcon /> : <DeleteIcon />}
          </IconButton>
          <IconButton aria-label="next" onClick={editFnc}>
            {theme.direction === 'rtl' ? <EditIcon /> : <EditIcon />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

export default CourseCard;
