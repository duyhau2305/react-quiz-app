import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';

function Score() {
  const location = useLocation();
  const navigate = useNavigate();
  const { finalScore } = location.state || { finalScore: 0 }; 

  return (
    <Box style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Final Score {finalScore}
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')} 
      >
        BACK TO SETTINGS!
      </Button>
    </Box>
  );
}

export default Score;
