import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import ClientPortal from './pages/ClientPortal';
import MarketStrategy from './pages/MarketStrategy';
import OperationalTelemetry from './pages/OperationalTelemetry';
import AssetPipeline from './pages/AssetPipeline';
import RiskAnalysis from './pages/RiskAnalysis';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/AuthContext';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname} className="min-h-screen">
        <Routes location={location}>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path="/login" element={
            <PageTransition>
              <Login />
            </PageTransition>
          } />
          <Route path="/register" element={
            <PageTransition>
              <Register />
            </PageTransition>
          } />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRole="admin">
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/portal" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <ClientPortal />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/strategy" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <MarketStrategy />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/telemetry" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <OperationalTelemetry />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/growth" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <AssetPipeline />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/risk" 
            element={
              <ProtectedRoute>
                <PageTransition>
                  <RiskAnalysis />
                </PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
