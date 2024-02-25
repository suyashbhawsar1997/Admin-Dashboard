import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  Container,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "../../assets/images/login/email.svg";
import passicon from "../../assets/images/login/pass.svg";
import axios from "axios";

const theme = createTheme();

const schema = yup.object().shape({
  userName: yup
    .string()
    .email("Email should be valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userNameErr, setUserNameErr] = useState("");
  const [passErr, setPassErr] = useState("");

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      loginUser(values);
    },
  });

  const loginUser = async (values) => {
    setUserNameErr("");
    setPassErr("");
    try {
      const response = await axios.post(
        `http://13.201.109.71:3024/admin/login`,
        values
      );
      if (response.status === 201) {
        toast.success("Login successful!", { autoClose: 500 });
        const token = response.headers.token;
        localStorage.setItem("token", token);

        setTimeout(() => {
          navigate("/customer");
        }, 1000);
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.details[0].message;
        toast.error(errorMessage, { position: "top-right", autoClose: 500 });
        if (error.response.data.details[0].name === "userName") {
          setUserNameErr(errorMessage);
        }
        if (error.response.data.details[0].name === "password") {
          setPassErr(errorMessage);
        }
        console.log(errorMessage);
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}
      
      >
        <Container component="main" maxWidth="xs">
          <Box textAlign="center" >
            <h2 sx={{ color: "rgba(0, 0, 0, 1)" }}>LOGIN</h2>
          </Box>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ mb: 2, width: "100%" }}>
              <Box sx={{ position: "relative" }}>
                <TextField
                  type="email"
                  id="email"
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Email Address"
                  {...formik.getFieldProps("userName")}
                  error={formik.touched.userName && formik.errors.userName}
                  helperText={
                    (formik.touched.userName && formik.errors.userName)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={EmailIcon}
                          alt="Email"
                          style={{ maxWidth: "85%" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* Display error message in red color */}
                <p style={{ color: "red" }}>
                  {userNameErr}
                </p>
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ position: "relative" }}>
                <TextField
                  type={showPassword ? "text" : "password"}
                  id="password"
                  fullWidth
                  variant="outlined"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                  error={formik.touched.password && formik.errors.password}
                  helperText={
                    (formik.touched.password && formik.errors.password)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={passicon}
                          alt="password"
                          style={{ maxWidth: "85%" }}
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          style={{ color: "rgba(131, 131, 131, 1)" }}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <p style={{ color: "red" }}>
                  {passErr}
                </p>
              </Box>
            </Box>
            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ alignSelf: 'center', color: "rgba(0, 0, 0, 1)", fontSize: "14px", margin: 0 }}>
                Forgot Password
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" style={{ marginRight: '5px' }} />
                <p style={{ color: "rgba(0, 0, 0, 1)", fontSize: "14px", margin: 0 }}>
                  Remember Me
                </p>
              </div>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "rgba(142, 96, 204, 1)",
                  color: "white",
                  padding: "10px 0",
                  borderRadius: "30px",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "rgba(142, 96, 204, 1)",
                  },
                }}
              >
                Log In
              </Button>
            </Box>
          </Box>
         
        </Container>
        <img
          src={require("../../assets/images/login/Frame1.png")}
          alt="Bottom Image"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "auto",
          }}
        />
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
};

export default Login;







