import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// mui core
import { Box, Container } from '@mui/material';

// guards
import AuthGuard from './components/Auth/AuthGuard';
import GuestGuard from './components/Auth/GuestGuard';
import Layout from './components/Layout/Layout';

const DashBoard = lazy(() => import('./pages/DashBoard'));
const Question = lazy(() => import('./pages/Question'));
const Score = lazy(() => import('./pages/Score'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<AuthGuard><Layout><DashBoard /></Layout></AuthGuard>} />
        <Route path="/question" element={<AuthGuard><Layout><Question /></Layout></AuthGuard>} />
        <Route path="/score" element={<AuthGuard><Layout><Score /></Layout></AuthGuard>} />
        <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
        <Route path="/register" element={<GuestGuard><Register /></GuestGuard>} />
      </Routes>
    </Suspense>
  );
}

export default App;
