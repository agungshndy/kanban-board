import React from 'react';
import Board from '../components/Board';
import { useAuthStore } from '../store/useAuthStore';
import { useBoardStore } from '../store/useBoardStore';

export default function Dashboard() {
  const { user }             = useAuthStore();
  const { cards, columns }   = useBoardStore();
  const done  = cards.filter(c => c.columnId === 'done').length;
  const total = cards.length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-lg text-slate-800">My Board</h2>
            <p className="text-sm text-slate-400 mt-0.5">Welcome back, <span className="font-semibold text-slate-600">{user?.name}</span> 👋</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-lg font-bold text-slate-700">{total}</p>
              <p className="text-xs text-slate-400">Total Cards</p>
            </div>
            <div className="text-center px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl">
              <p className="text-lg font-bold text-emerald-600">{done}</p>
              <p className="text-xs text-emerald-400">Completed</p>
            </div>
            <div className="text-center px-4 py-2 bg-primary-50 border border-primary-100 rounded-xl">
              <p className="text-lg font-bold text-primary-600">{columns.length}</p>
              <p className="text-xs text-primary-400">Columns</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6 scrollbar-thin">
        <Board />
      </div>
    </div>
  );
}
