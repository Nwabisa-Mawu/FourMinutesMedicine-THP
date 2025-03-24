import React from "react";
import { Card, CardContent, Typography, TextField, Button, Box, Alert } from "@mui/material";

const EditComponent = (props) => {
    const { editTypeName, editFieldsArr,  hasImgUpload, imageData, 
      modalCtrlBtnsArr, handleSubmit, handleChange, error, form } = props;

    return (
        <>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Card sx={{ maxWidth: 500, width: "100%", p: 2 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                     {editTypeName}
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        {(editFieldsArr && editFieldsArr.length) ? editFieldsArr.map((field, key) => {
                            return (
                                <TextField
                                    key={key}
                                    label={field.label}
                                    name={field.name}
                                    fullWidth
                                    margin="normal"
                                    required
                                    row={field.row ? field.row : 1}
                                  value={form[field.name] ? form[field.name]:""}
                                  onChange={handleChange}
                                />
                            )
                        }) : null}
         
                      { hasImgUpload ?
                         <div>
                        <Typography gutterBottom>
                          Upload {imageData.imgName}
                        </Typography>
                         <input
                        type="file"
                        name={imageData.name}
                        accept="image/*"
                        onChange={handleChange}
                        style={{ marginTop: "16px" }}
                      />
                      </div>
                      : null}

                      {(modalCtrlBtnsArr && modalCtrlBtnsArr.length) ? modalCtrlBtnsArr.map((btn, key) => {
                            return (
                                <Button type={btn.isSubmit ? "submit" : "button"} key={key} 
                                  variant="contained" fullWidth color={btn.color}
                                  onClick={btn.onClick ? btn.onClick : null}>
                                    {btn.label}
                                </Button>
                            )
                      }) : null}
                    </form>
                  </CardContent>
                </Card>
              </Box>
        </>
    );
};

export default EditComponent;