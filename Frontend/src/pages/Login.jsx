import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Card sx={{ width: "100%" }}>
          <CardContent sx={{ p: 5 }}>
            <Typography variant="h4" gutterBottom>
              Employee Access Portal
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Login to continue
            </Typography>

            <TextField
              fullWidth
              label="User ID"
              name="userId"
              margin="normal"
              onChange={handleChange}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              margin="normal"
              onChange={handleChange}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;