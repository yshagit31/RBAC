import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {yariga} from '../assets'
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
  } from "@mui/material";
// import authProvider from "../authProvider"; // Adjust import path as needed

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {

        if(email &&password &&confirmPassword)
        {
          if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
          }
          try {
            const response = await fetch("http://localhost:8000/api/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }), 
            });
        
            if (response.ok) {
              const data = await response.json();
              // console.log("Registration successful:", data);
              navigate("/login"); // Redirect to the login page
            } else {
              const errorData = await response.json();
              setErrorMessage(errorData.message || "Registration failed.");
            }
          } catch (error) {
            console.error("Error during registration:", error);
            setErrorMessage("An error occurred. Please try again.");
          }
        } else {
          setErrorMessage("Please fill in all fields.");
        }
      }
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f4f9",
    }}
  >
    <Box
      sx={{
        width: 400,
        padding: 4,
        backgroundColor: "#ffffff",
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box display="flex" justifyContent="center" mb={3}>
        <img src={yariga} alt="logo" />
      </Box>

      <Typography variant="h4" textAlign="center" marginBottom={3}>
        Register
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
              <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleRegister}
        >
          Register
        </Button>
        <Button
          variant="text"
          color="secondary"
          fullWidth
          onClick={() => navigate("/login")}
        >
          Already have an account? Sign In
        </Button>
      </Box>
    </Box>
  </Box>
  );
};

export default Register;
