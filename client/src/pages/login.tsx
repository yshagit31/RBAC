import { useLogin } from "@refinedev/core";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { yariga } from '../assets';
// import authProvider from "../authProvider";

import { Box, Button, TextField, Typography, Container, Stack, CircularProgress, Alert } from "@mui/material";
import { createTheme, useMediaQuery, useTheme } from '@mui/material';
import { PaletteMode } from '@mui/material';
import { CredentialResponse } from "../interfaces/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSystemMode = useMediaQuery('(prefers-color-scheme: dark)'); // Automatically detects the system's color scheme
  
  const calculatedMode: PaletteMode = isSystemMode ? 'dark' : 'light'; // Choose dark or light based on the system's preference
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate: login } = useLogin<CredentialResponse>();

  const THEME = createTheme({
    palette: {
      mode: calculatedMode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });  // Email/password login
      navigate("/");  // Navigate to the homepage
    } catch (error) {
      setErrorMessage("Email login failed!");  // Display error message
    } finally {
      setLoading(false);  // Stop loading animation
    }
  };

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      window.google.accounts.id.initialize({
        ux_mode: "popup",
        client_id: GOOGLE_CLIENT_ID,
        callback: async (res: CredentialResponse) => {
          if (res.credential) {
            login(res);  // Use the Google credential to login
          }
        },
      });
      window.google.accounts.id.renderButton(divRef.current, {
        theme: "filled_blue",
        size: "medium",
        type: "standard",
      });
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      gap="24px"
    >
      <Container maxWidth="xs">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="16px"
          p={3}
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            width: '100%',
          }}
        >
          <div><img src={yariga} alt="logo" /></div>
          <Typography variant="h5" gutterBottom>Sign In</Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Stack spacing={2} width="100%">
            {/* Email */}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage(""); // Clear error when the user starts typing
              }}
            />

            {/* Password */}
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage(""); // Clear error when the user starts typing
              }}
            />

            {/* Sign-In Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleEmailPasswordLogin}
              disabled={loading}
              sx={{ padding: '10px 0' }}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>

            {/* Register Button */}
            <Button
              variant="text"
              color="secondary"
              fullWidth
              onClick={() => navigate('/register')}
              sx={{ padding: '10px 0' }}
            >
              Don't have an account? Register
            </Button>
          </Stack>
          <GoogleButton />
        </Box>
      </Container>
    </Box>
  );
};
