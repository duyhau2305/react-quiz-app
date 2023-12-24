import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Container, Grid, Link } from '@mui/material';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    // Handle the login logic here with data.username and data.password
    // Kiểm tra user va pass word
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            {...register("username", { required: "Username required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", { required: "Password required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
          />
          <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid item>
              <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
