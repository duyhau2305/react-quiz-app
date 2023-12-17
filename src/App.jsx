import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// mui core
import { Container } from '@mui/material';

const DashBoard = lazy(() => import('./pages/DashBoard'));
const Question = lazy(() => import('./pages/Question'));
const Score = lazy(() => import('./pages/Score'));

function App() {
  return (
   
      <Suspense fallback={<div>Loading...</div>}>
        <Container maxWidth="sm">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/question" element={<Question />} />
            <Route path="/score" element={<Score />} />
          </Routes>
        </Container>
       
      </Suspense>
  
  );
}

export default App;
