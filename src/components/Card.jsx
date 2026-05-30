import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useBoardStore } from '../store/useBoardStore';

const PRIORITY = {
  high:   { label: 'High',   cls: 'bg-red-50 text-red-500 ring-1 ring-red-200'        },
  medium: { label: 'Medium', cls: 'bg-amber-50 text-amber-500 ring-1 ring-amber-200'  },
  low:    { label: 'Low',    cls: 'bg-emerald-50 text-emerald-500 ring-1 ring-emerald-200' },
};

export default function Card({ card }) {
  const { updateCard, deleteCard } = useBoardStore();
  const [editing, setEditing]   = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [form, setForm]         = useState({ title: card.title, description: card.description, priority: card.priority });

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const p = PRIORITY[card.priority] || PRIORITY.medium;

  const save = () => {
    if (!form.title.trim()) return;
    updateCard(card.id, form);
    setEditing(false);
  };

  if (editing) return (
    <div className="bg-white rounded-xl p-3 shadow-card border border-primary-200 flex flex-col gap-2">
      <input autoFocus
        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500 placeholder:text-slate-400"
        value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Card title"
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
        <button onClick={save} className="flex-1 text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-lg py-1.5 transition-colors">Save</button>
        <button onClick={() => setEditing(false)} className="flex-1 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg py-1.5 transition-colors">Cancel</button>
      </div>
    </div>
  );

  return (
    <div ref={setNodeRef} style={style}
      className={`bg-white rounded-xl p-3 shadow-card border border-slate-100 flex gap-2.5 group transition-all duration-150
        ${isDragging ? 'opacity-40 scale-95' : 'hover:shadow-card-hover hover:border-slate-200'}`}
    >
      <div {...attributes} {...listeners} className="drag-handle text-slate-300 hover:text-slate-400 pt-0.5 text-base leading-none select-none">⠿</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1 mb-1">
          <span className="text-sm font-semibold text-slate-700 leading-snug">{card.title}</span>
          <div className="relative flex-shrink-0">
            <button onClick={() => setShowMenu(m => !m)}
              className="text-slate-300 hover:text-slate-500 font-bold text-sm px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity leading-none tracking-widest"
            >···</button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden min-w-[130px]">
                <button onClick={() => { setEditing(true); setShowMenu(false); }} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">✏️ Edit</button>
                <button onClick={() => deleteCard(card.id)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50">🗑 Delete</button>
              </div>
            )}
          </div>
        </div>
        {card.description && <p className="text-xs text-slate-400 leading-relaxed mb-2">{card.description}</p>}
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.cls}`}>{p.label}</span>
      </div>
    </div>
  );
}
