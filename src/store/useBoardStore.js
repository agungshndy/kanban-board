import { create } from 'zustand';

const DEFAULT_BOARD = {
  columns: [
    { id: 'todo',       title: 'To Do',      color: '#7B73FF' },
    { id: 'inprogress', title: 'In Progress', color: '#F59E0B' },
    { id: 'done',       title: 'Done',        color: '#10B981' },
  ],
  cards: [
    { id: 'card-1', columnId: 'todo',       title: 'Design wireframes',    description: 'Sketch the main user flows',        priority: 'high'   },
    { id: 'card-2', columnId: 'todo',       title: 'Set up project repo',  description: 'Initialize Git & folder structure', priority: 'medium' },
    { id: 'card-3', columnId: 'inprogress', title: 'Build auth UI',        description: 'Login and register pages',          priority: 'high'   },
    { id: 'card-4', columnId: 'done',       title: 'Project planning',     description: 'Define scope and tech stack',       priority: 'low'    },
  ],
};

const load = () => { try { const r = localStorage.getItem('kanban_board_vite'); return r ? JSON.parse(r) : DEFAULT_BOARD; } catch { return DEFAULT_BOARD; } };
const save = (s) => localStorage.setItem('kanban_board_vite', JSON.stringify({ columns: s.columns, cards: s.cards }));

export const useBoardStore = create((set) => ({
  ...load(),

  addCard: (columnId, title, description, priority) => set(s => {
    const n = { ...s, cards: [...s.cards, { id: `card-${Date.now()}`, columnId, title, description, priority }] };
    save(n); return n;
  }),
  updateCard: (id, updates) => set(s => {
    const n = { ...s, cards: s.cards.map(c => c.id === id ? { ...c, ...updates } : c) };
    save(n); return n;
  }),
  deleteCard: (id) => set(s => {
    const n = { ...s, cards: s.cards.filter(c => c.id !== id) };
    save(n); return n;
  }),
  moveCard: (cardId, newColumnId) => set(s => {
    const n = { ...s, cards: s.cards.map(c => c.id === cardId ? { ...c, columnId: newColumnId } : c) };
    save(n); return n;
  }),
  addColumn: (title) => {
    const colors = ['#EF4444','#8B5CF6','#EC4899','#14B8A6','#F97316'];
    const color  = colors[Math.floor(Math.random() * colors.length)];
    set(s => { const n = { ...s, columns: [...s.columns, { id: `col-${Date.now()}`, title, color }] }; save(n); return n; });
  },
  deleteColumn: (id) => set(s => {
    const n = { ...s, columns: s.columns.filter(c => c.id !== id), cards: s.cards.filter(c => c.columnId !== id) };
    save(n); return n;
  }),
}));
