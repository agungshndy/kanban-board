import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  return (
    <nav className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2.5">
        <span className="text-primary-500 text-xl leading-none">⬡</span>
        <span className="font-display font-extrabold text-lg tracking-tight text-slate-800">FlowBoard</span>
      </div>
      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">👤 {user.name}</span>
          <button onClick={logout} className="text-sm text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 px-3 py-1 rounded-full transition-colors">Logout</button>
        </div>
      )}
    </nav>
  );
}
