import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { TextField, Button, Box, Typography } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setError(null);
        window.location.href = "/add"; // Redirige al dashboard después de iniciar sesión
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        m:'5rem auto',
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth:'30rem',
        p: 3,
      }}
    >
      <Typography variant="h4" mb={2} color={'white'} textAlign={'center'}>Iniciar Sesión</Typography>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
        type="email"
        autoComplete="email"
      />
      <TextField
        label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        type="password"
        autoComplete="current-password"
        sx={{bgcolor:'white'}}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Iniciar Sesión
      </Button>
    </Box>
  );
};

export default Login;
