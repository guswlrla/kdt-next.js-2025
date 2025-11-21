'use client'
import TailButton from '@/components/TailButton'
import { useState } from 'react';
import type { TodoData } from './page';

interface TodoItemProps {
  todoItem : TodoData,
  todos : TodoData[],
  setTodos : (newItem: TodoData[]) => void
}
export default function TodoItem({todoItem, todos, setTodos} : TodoItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(todoItem.text);

  const handleDel = () => {
    const newItem = todos.filter(item => item.id != todoItem.id);
    setTodos(newItem);
  }
  const handleToggle = () => {
    const newItem = todos.map(t => t.id == todoItem.id ? {...t, completed: !todoItem.completed} : t);
    setTodos(newItem);
  }
  const handleCancel = () => {
    setIsEdit(false);
    setEditText(todoItem.text);
  }
  const handleSave = () => {
    const newItem = todos.map(t => t.id == todoItem.id ? {...t, text: editText} : t);
    setTodos(newItem);
    setIsEdit(false);
  }
  return (
  <div className='w-full max-w-3xl flex justify-center items-center my-3'>
    <input type="checkbox" checked={todoItem.completed} onChange={handleToggle} disabled={isEdit} className="w-4 h-4 bg-gray-100 border-gray-300 rounded-sm " />
      {isEdit ? <input type='text' value={editText} onChange={e => setEditText(e.target.value)} className="flex-1 border border-gray-300 rounded-sm text-sm p-2 mx-2 font-medium text-gray-900 mr-3" /> : <span className={`flex-1 p-2 text-sm font-medium text-gray-900 mr-3 ${todoItem.completed ? "line-through" : ""}`}>{todoItem.text}</span>}
      {isEdit ? (<div className="flex space-x-2"><TailButton color="gray" caption="저장" onHandle={handleSave} /><TailButton color="gray" caption="취소" onHandle={handleCancel}/></div>) : (<div className="flex space-x-2"><TailButton color="gray" caption="수정" onHandle={() => setIsEdit(true)}/><TailButton color="gray" caption="삭제" onHandle={handleDel} /></div>)}
  </div>
  )
}
