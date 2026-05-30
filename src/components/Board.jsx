import React, { useState } from 'react';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { useBoardStore } from '../store/useBoardStore';
import Column from './Column';
import Card from './Card';

export default function Board() {
  const { columns, cards, moveCard, addColumn } = useBoardStore();
  const [activeCard, setActiveCard] = useState(null);
  const [addingCol, setAddingCol]   = useState(false);
  const [colTitle, setColTitle]     = useState('');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = ({ active }) => setActiveCard(cards.find(c => c.id === active.id) || null);

  const handleDragEnd = ({ active, over }) => {
    setActiveCard(null);
    if (!over) return;
    const card = cards.find(c => c.id === active.id);
    if (!card) return;
    if (columns.find(col => col.id === over.id)) { moveCard(card.id, over.id); return; }
    const target = cards.find(c => c.id === over.id);
    if (target && target.columnId !== card.columnId) moveCard(card.id, target.columnId);
  };

  const handleAddColumn = () => {
    if (!colTitle.trim()) return;
    addColumn(colTitle.trim());
    setColTitle(''); setAddingCol(false);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-8 items-start scrollbar-thin">
        {columns.map(col => <Column key={col.id} column={col} />)}
        <div className="flex-shrink-0 w-72">
          {addingCol ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-2">
              <input autoFocus
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500 placeholder:text-slate-400"
                value={colTitle} onChange={e => setColTitle(e.target.value)}
                placeholder="Column title" onKeyDown={e => e.key === 'Enter' && handleAddColumn()}
              />
              <div className="flex gap-2">
                <button onClick={handleAddColumn} className="flex-1 text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-lg py-1.5 transition-colors">Add</button>
                <button onClick={() => setAddingCol(false)} className="flex-1 text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg py-1.5 transition-colors">Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddingCol(true)}
              className="w-full py-3 px-4 bg-white border-2 border-dashed border-slate-200 hover:border-primary-400 hover:text-primary-500 text-slate-400 rounded-2xl text-sm font-semibold transition-all"
            >+ Add Column</button>
          )}
        </div>
      </div>
      <DragOverlay>{activeCard ? <Card card={activeCard} /> : null}</DragOverlay>
    </DndContext>
  );
}
