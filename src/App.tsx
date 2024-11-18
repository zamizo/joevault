import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthLayout } from './components/auth/AuthLayout';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { Dashboard } from './components/Dashboard';
import { FiguresList } from './components/figures/FiguresList';
import { AccessoriesList } from './components/accessories/AccessoriesList';
import { VehiclesList } from './components/vehicles/VehiclesList';
import { PlaysetsList } from './components/playsets/PlaysetsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<AuthLayout />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/figures" element={<FiguresList />} />
            <Route path="/accessories" element={<AccessoriesList />} />
            <Route path="/vehicles" element={<VehiclesList />} />
            <Route path="/playsets" element={<PlaysetsList />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;