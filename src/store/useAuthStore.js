import { create } from 'zustand';

const getUsers   = () => JSON.parse(localStorage.getItem('kanban_users') || '[]');
const saveUsers  = (u) => localStorage.setItem('kanban_users', JSON.stringify(u));
const getSession = () => JSON.parse(localStorage.getItem('kanban_session') || 'null');

export const useAuthStore = create((set) => ({
  user: getSession(),

  register: (name, email, password) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) return { error: 'Email already registered' };
    const user = { id: `user-${Date.now()}`, name, email, password };
    saveUsers([...users, user]);
    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem('kanban_session', JSON.stringify(session));
    set({ user: session });
    return { success: true };
  },

  login: (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { error: 'Invalid email or password' };
    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem('kanban_session', JSON.stringify(session));
    set({ user: session });
    return { success: true };
  },

  logout: () => {
    localStorage.removeItem('kanban_session');
    set({ user: null });
  },
}));
