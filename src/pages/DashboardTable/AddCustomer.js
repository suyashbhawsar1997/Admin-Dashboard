// import React from "react";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Box,
//   IconButton,
//   Grid,
// } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CloseIcon from "@mui/icons-material/Close";

// const AddCustomer = ({ handleClose }) => {


//   return (
//     <>
//       <Dialog open={true} onClose={handleClose}>
//         {/* Dialog Title */}
//         <DialogTitle>
//           Add New Customer
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//         <form>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="name"
//                   label="Name"
//                   variant="outlined"
//                   value=""
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="position"
//                   label="Position"
//                   variant="outlined"
//                   value=""
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="phone"
//                   label="Phone"
//                   variant="outlined"
//                   value=""
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="whatsApp"
//                   label="WhatsApp"
//                   variant="outlined"
//                   value=""
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   name="email"
//                   label="Email"
//                   variant="outlined"
//                   value=""
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   name="linkedin"
//                   label="LinkedIn"
//                   variant="outlined"
//                   value=""
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   name="profileImage"
//                   label="Profile Image"
//                   variant="outlined"
//                   value=""
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="industry"
//                   label="Industry"
//                   variant="outlined"
//                   value=""
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="amount"
//                   label="Amount"
//                   variant="outlined"
//                   type="number"
//                   value=""
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   name="message"
//                   label="Message"
//                   variant="outlined"
//                   multiline
//                   rows={4}
//                   value=""
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>
//             <Box mt={2} display="flex" justifyContent="center">
//               <Button type="submit" variant="contained" style={{backgroundColor:"rgba(142, 96, 204, 1)"}}>
//                 Submit
//               </Button>
//             </Box>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <ToastContainer />
//     </>
//   );
// };

// export default AddCustomer;

import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { toast } from "react-toastify";

const AddCustomer = ({ fetchUserData }) => {
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => {
    setIsOpen(false);
  };
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    phone: '',
    whatsApp: '',
    email: '',
    linkedin: '',
    profileImage: '',
    industry: '',
    amount: '',
    message: ''
  });


  // Function to handle changes in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
  
      const response = await axios.post(
        `http://13.201.109.71:3024/admin/add-customer`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
  
      if (response.status === 201) {
        setFormData({
          name: '',
          position: '',
          phone: '',
          whatsApp: '',
          email: '',
          linkedin: '',
          profileImage: '',
          industry: '',
          amount: '',
          message: ''
        });
        fetchUserData();
        toast.success("Customer added successfully", { autoClose: 1000 });
      } else {
        console.error("Unexpected status code:", response.status);
        toast.error("Error adding customer!");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("Error adding customer!");
    }
  };
  


  return (
    <>

      {isOpen && (
        <Box
          transform="translate(-50%, -50%)"
          bgcolor="white"
          p={4}
          boxShadow={5}
          borderRadius={8}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <h2>Add Customer</h2>
            <CloseIcon onClick={closeModal} style={{ cursor: 'pointer' }} />
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="position"
                  label="Position"
                  variant="outlined"
                  value={formData.position}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="whatsApp"
                  label="WhatsApp"
                  variant="outlined"
                  value={formData.whatsApp}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="linkedin"
                  label="LinkedIn"
                  variant="outlined"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="profileImage"
                  label="Profile Image"
                  variant="outlined"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="industry"
                  label="Industry"
                  variant="outlined"
                  value={formData.industry}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="amount"
                  label="Amount"
                  variant="outlined"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="message"
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box mt={2} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" style={{ backgroundColor: "rgba(142, 96, 204, 1)" }}>
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
};

export default AddCustomer;
