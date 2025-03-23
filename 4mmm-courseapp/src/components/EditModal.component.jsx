import React from "react";
import { Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";

const EditModal = (props) => {
    const { editTypeName, editFieldsArr,  hasImgUpload, imageData, modalCtrlBtnsArr, handleSubmit, } = props;

    return (
        <>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Card sx={{ maxWidth: 500, width: "100%", p: 2 }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                     {editTypeName}
                    </Typography>
                    {/* {error && <Alert severity="error">{error}</Alert>} */}
                    <form>
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
                                //   value={form.coursename}
                                //   onChange={handleChange}
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
                        // name={props.imageData.name}
                        accept="image/*"
                        // onChange={handleChange}
                        style={{ marginTop: "16px" }}
                      />
                      </div>
                      : null}

                      {(modalCtrlBtnsArr && modalCtrlBtnsArr.length) ? modalCtrlBtnsArr.map((btn, key) => {
                            return (
                                <Button type={btn.isSubmit ? "submit" : "button"} key={key} variant="contained" fullWidth color={btn.color}>
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

export default EditModal;