import React from "react";
import EditModal from "../components/EditModal.component";

const EditUserDialog = () => {
    const userEditFields = {
        //TODO: make dynamic
        editTypeName: "Edit User",
        editFieldsArr: [
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Email", name: "email" },
            { label: "Password", name: "password", type: "password" }
        ],
        hasImgUpload: true,
        imageData: { imgName: "User Image", name: "userImg" },
        modalCtrlBtnsArr: [
            { label: "Update", color: "primary", isSubmit: true },
            { label: "Cancel", color: "secondary", isSubmit: false, color: "error" },
        ],
    };

    return (
        <EditModal 
            editTypeName={userEditFields.editTypeName}
            editFieldsArr={userEditFields.editFieldsArr}
            hasImgUpload={userEditFields.hasImgUpload}
            imageData={userEditFields.imageData}
            modalCtrlBtnsArr={userEditFields.modalCtrlBtnsArr}
            />
    )
}

export default EditUserDialog;