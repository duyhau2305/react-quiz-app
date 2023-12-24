import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// mui core
import { Box, Container } from '@mui/material';
import Login from './pages/Login';

const DashBoard = lazy(() => import('./pages/DashBoard'));
const Question = lazy(() => import('./pages/Question'));
const Score = lazy(() => import('./pages/Score'));

function App() {
  return (
   
      <Suspense fallback={<div>Loading...</div>}>
        <Container maxWidth="sm">
          <Box mt={5}>
            <Routes>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/" element={<Login/> }/>
              <Route path="/question" element={<Question />} />
              <Route path="/score" element={<Score />} />
            </Routes>
          </Box>
        </Container>
      </Suspense>
  
  );
}

export default App;
