import { create } from 'zustand';

const DEFAULT_BOARD = {
  columns: [
    { id: 'todo', title: 'To Do', color: '#6C63FF' },
    { id: 'inprogress', title: 'In Progress', color: '#F59E0B' },
    { id: 'done', title: 'Done', color: '#10B981' },
  ],
  cards: [
    { id: 'card-1', columnId: 'todo', title: 'Design wireframes', description: 'Sketch out the main user flows', priority: 'high' },
    { id: 'card-2', columnId: 'todo', title: 'Set up project repo', description: 'Initialize Git and folder structure', priority: 'medium' },
    { id: 'card-3', columnId: 'inprogress', title: 'Build auth UI', description: 'Login and register pages', priority: 'high' },
    { id: 'card-4', columnId: 'done', title: 'Project planning', description: 'Define scope and tech stack', priority: 'low' },
  ],
};

const loadState = () => {
  try {
    const raw = localStorage.getItem('kanban_board');
    return raw ? JSON.parse(raw) : DEFAULT_BOARD;
  } catch {
    return DEFAULT_BOARD;
  }
};

const saveState = (state) => {
  localStorage.setItem('kanban_board', JSON.stringify({ columns: state.columns, cards: state.cards }));
};

export const useBoardStore = create((set, get) => ({
  ...loadState(),

  addCard: (columnId, title, description, priority) => {
    const card = { id: `card-${Date.now()}`, columnId, title, description, priority };
    set(s => {
      const next = { ...s, cards: [...s.cards, card] };
      saveState(next);
      return next;
    });
  },

  updateCard: (id, updates) => {
    set(s => {
      const next = { ...s, cards: s.cards.map(c => c.id === id ? { ...c, ...updates } : c) };
      saveState(next);
      return next;
    });
  },

  deleteCard: (id) => {
    set(s => {
      const next = { ...s, cards: s.cards.filter(c => c.id !== id) };
      saveState(next);
      return next;
    });
  },

  moveCard: (cardId, newColumnId) => {
    set(s => {
      const next = { ...s, cards: s.cards.map(c => c.id === cardId ? { ...c, columnId: newColumnId } : c) };
      saveState(next);
      return next;
    });
  },

  addColumn: (title) => {
    const colors = ['#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const col = { id: `col-${Date.now()}`, title, color };
    set(s => {
      const next = { ...s, columns: [...s.columns, col] };
      saveState(next);
      return next;
    });
  },

  deleteColumn: (id) => {
    set(s => {
      const next = {
        ...s,
        columns: s.columns.filter(c => c.id !== id),
        cards: s.cards.filter(c => c.columnId !== id),
      };
      saveState(next);
      return next;
    });
  },
}));