import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Card from './Card';
import { useBoardStore } from '../store/useBoardStore';

export default function Column({ column }) {
  const { cards, addCard, deleteColumn } = useBoardStore();
  const columnCards = cards.filter(c => c.columnId === column.id);
  const [adding, setAdding]     = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [form, setForm]         = useState({ title: '', description: '', priority: 'medium' });

  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const handleAdd = () => {
    if (!form.title.trim()) return;
    addCard(column.id, form.title, form.description, form.priority);
    setForm({ title: '', description: '', priority: 'medium' });
    setAdding(false);
  };

  return (
    <div className="flex-shrink-0 w-72 bg-slate-50 rounded-2xl border border-slate-200 shadow-col flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: column.color }} />
          <h3 className="font-display font-bold text-sm text-slate-700 tracking-tight">{column.title}</h3>
          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{columnCards.length}</span>
        </div>
        <div className="relative">
          <button onClick={() => setShowMenu(m => !m)} className="text-slate-300 hover:text-slate-500 font-bold text-sm px-1 rounded transition-colors leading-none tracking-widest">···</button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden min-w-[150px]">
              <button onClick={() => { setAdding(true); setShowMenu(false); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">➕ Add Card</button>
              <button onClick={() => deleteColumn(column.id)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50">🗑 Delete Column</button>
            </div>
          )}
        </div>
      </div>

      {/* Drop zone */}
      <div ref={setNodeRef}
        className={`flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-thin p-3 min-h-[60px] transition-colors duration-150
          ${isOver ? 'bg-primary-50 outline-2 outline-dashed outline-primary-300 rounded-xl' : ''}`}
      >
        <SortableContext items={columnCards.map(c => c.id)} strategy={verticalListSortingStrategy}>
          {columnCards.map(card => <Card key={card.id} card={card} />)}
        </SortableContext>
        {columnCards.length === 0 && !adding && (
          <div className="text-center text-xs text-slate-300 py-6 border-2 border-dashed border-slate-200 rounded-xl">Drop cards here</div>
        )}
      </div>

      {/* Add card */}
      <div className="p-3 pt-0">
        {adding ? (
          <div className="bg-white rounded-xl p-3 border border-primary-200 shadow-card flex flex-col gap-2 mt-2">
            <input autoFocus
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500 placeholder:text-slate-400"
              value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Card title" onKeyDown={e => e.key === 'Enter' && handleAdd()}
            />
            <textarea rows={2}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500 resize-none placeholder:text-slate-400"
              value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description (optional)"
            />
            <select
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500"
              value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <div className="flex gap-2">
              <button onClick={handleAdd} className="flex-1 text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-lg py-1.5 transition-colors">Add Card</button>
              <button onClick={() => setAdding(false)} className="flex-1 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg py-1.5 transition-colors">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAdding(true)}
            className="w-full mt-2 text-sm text-slate-400 hover:text-primary-500 hover:bg-primary-50 py-2 rounded-xl transition-colors text-left px-3"
          >+ Add Card</button>
        )}
      </div>
    </div>
  );
}
