import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ArtworksPage from './pages/ArtworksPage';
import CollectionsPage from './pages/CollectionsPage';
import ExhibitionsPage from './pages/ExhibitionsPage';
import BlogPage from './pages/BlogPage';
import SettingsPage from './pages/SettingsPage';
import SubmissionsPage from './pages/SubmissionsPage';
import AdminLayout from './components/AdminLayout';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/artworks" element={<ArtworksPage />} />
                <Route path="/collections" element={<CollectionsPage />} />
                <Route path="/exhibitions" element={<ExhibitionsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/messages" element={<SubmissionsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
