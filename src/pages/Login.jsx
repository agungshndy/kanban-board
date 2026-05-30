import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export default function Login() {
  const { login, register } = useAuthStore();
  const [mode, setMode]   = useState('login');
  const [form, setForm]   = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (!form.email || !form.password) return setError('Please fill in all fields.');
    if (mode === 'register' && !form.name) return setError('Name is required.');
    const result = mode === 'login'
      ? login(form.email, form.password)
      : register(form.name, form.email, form.password);
    if (result.error) setError(result.error);
  };

  const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 placeholder:text-slate-400 transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-30 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col items-center gap-5">
        <div className="w-14 h-14 bg-primary-50 border border-primary-100 rounded-2xl flex items-center justify-center text-2xl">⬡</div>
        <div className="text-center -mt-1">
          <h1 className="font-display font-extrabold text-2xl text-slate-800 tracking-tight">FlowBoard</h1>
          <p className="text-sm text-slate-400 mt-1">Organize your work, visually.</p>
        </div>

        <div className="flex bg-slate-100 rounded-xl p-1 w-full gap-1">
          {['login','register'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all ${mode === m ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >{m}</button>
          ))}
        </div>

        <div className="w-full flex flex-col gap-3">
          {mode === 'register' && (
            <input className={inputCls} placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          )}
          <input className={inputCls} type="email" placeholder="Email address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <input className={inputCls} type="password" placeholder="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
        </div>

        {error && <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2 w-full text-center">{error}</p>}

        <button onClick={handleSubmit} className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm py-3 rounded-xl transition-colors shadow-sm">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </button>

        <p className="text-sm text-slate-400">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span className="text-primary-500 font-semibold cursor-pointer hover:underline"
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
          >{mode === 'login' ? 'Register' : 'Login'}</span>
        </p>
      </div>
    </div>
  );
}
