import React from "react";
import { Link } from "react-router";
import { Card, CardContent, Typography, TextField, Button, Alert, CircularProgress, Box } from "@mui/material";

const AuthForm = (props) => {
    const {formName, editFieldsArr, submitBtn, altLink, handleSubmit,
       handleChange, error, isLoading, form } = props;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
              <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {formName}
                  </Typography>
                  {error && <Alert severity="err">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        {(editFieldsArr && editFieldsArr.length) ? editFieldsArr.map((field, key) => {
                            return (
                                <TextField key={key} label={field.label} name={field.name} fullWidth margin="normal" required
                                  value={form[field.name] ? form[field.name]:""} onChange={handleChange}
                                />
                            )
                        }): null}
    
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                       {isLoading ? <CircularProgress size={24} /> : submitBtn.name}
                    </Button>
                  </form>
                  <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                   {altLink.text} <Link to={altLink.pathName}>{altLink.linkName}</Link>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
    );
};

export default AuthForm;