import React from "react";
import { Card, CardContent, Typography, TextField, Button, Alert, CircularProgress, Box } from "@mui/material";

const AuthForm = (props) => {
    const {formName, editFieldsArr, submitBtn, altLink } = props;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
              <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {formName}
                  </Typography>
                  
                    <form>
                        {(editFieldsArr && editFieldsArr.length) ? editFieldsArr.map((field, key) => {
                            return (
                                <TextField key={key} label={field.label} name={field.name} fullWidth margin="normal" required
                                //   value={form[field.name]} onChange={handleChange}
                                />
                            )
                        }): null}
    
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                       {submitBtn.name}
                    </Button>
                  </form>
                  <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                   {altLink.text} <a href="#">{altLink.linkName}</a>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
    );
};

export default AuthForm;