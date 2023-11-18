import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';


const DashBoard = lazy(() => import('./pages/DashBoard'));
const Question = lazy(() => import('./pages/Question'));
const Score = lazy(() => import('./pages/Score'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}> 
        <Routes> 
          <Route path="/" element={<DashBoard />}/>
          <Route path="/question" element={<Question />} />
          <Route path="/score" element={<Score />} />
          
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
