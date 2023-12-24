import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); 

  const onSubmit = data => {
    console.log(data);
    // kiem tra Authentication 
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 12, borderRadius: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 3 }}>
            Welcome to QUIZAPP
          </Typography>
          <Typography variant="caption" sx={{ mb: 3 }}>
            Please sign-in to your account and start the adventure
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", { required: 'Email is required' })}
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
              {...register("password", { required: 'Password is required' })}
              sx={{ mb: 2 }}
            />
            <Grid container sx={{ mb: 2 }}>
              <Grid item xs>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <MuiLink component="button" variant="subtitle2" onClick={() => navigate('/forgot-password')}>
                  Forgot Password?
                </MuiLink>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5, mb: 2 }}
            >
              LOGIN
            </Button>
            <Grid container justifyContent="center">
              <MuiLink component="button" variant="subtitle2" onClick={() => navigate('/signup')}>
                New on our platform? Create an account
              </MuiLink>
            </Grid>
            <Box sx={{ width: '100%', textAlign: 'center', my: 2 }}>
              <Typography variant="caption" color="textSecondary">
                or
              </Typography>
            </Box>
            <Grid container justifyContent="space-around">
              <MuiLink href="#" color="inherit">
                <FacebookIcon />
              </MuiLink>
              <MuiLink href="#" color="inherit">
                <TwitterIcon />
              </MuiLink>
              <MuiLink href="#" color="inherit">
                <GoogleIcon />
              </MuiLink>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
