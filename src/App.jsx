import React from 'react';
import { useAuthStore } from './store/useAuthStore';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './index.css';

export default function App() {
  const { user } = useAuthStore();
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {user && <Navbar />}
      {user ? <Dashboard /> : <Login />}
    </div>
  );
}
