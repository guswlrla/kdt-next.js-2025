'use client'
import { useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import { supabase } from "@/supabase/client";

export interface TodoData {
  id : number,
  text : string | undefined,
  completed : boolean
}
export default function TodoList() {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [completed, setCompleted] = useState(0);
  const [incompleted, setIncompleted] = useState(0);
  // console.log(todos);

  const getTodos = async () => { // 라이브러리를 써서 간단하게 할 수 있음
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('id', { ascending: false });
    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      setTodos(data);
    }
  }

  const handleSave = async (newItem : TodoData[]) => {
    setTodos(newItem);
    localStorage.setItem("todo", JSON.stringify(newItem));
  }

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    setCompleted(todos.filter(todo => todo.completed).length);
    setIncompleted(todos.filter(todo => !todo.completed).length);
  }, [todos])

  return (
    <div className='w-full flex flex-col justify-start items-center'>
      <h1 className='w-full max-w-3xl text-2xl font-bold text-center mt-10'>🎯 할 일 목록(Supabase Client 라이브러리)</h1>
      <div className='w-full max-w-3xl bg-gray-100 p-5 my-2 font-bold'>전체 : {todos.length}개 | 완료 : {completed}개 | 미완료 : {incompleted}개 </div>
      <TodoInput todos={todos} setTodos={handleSave} />
      {todos.map(i => <TodoItem key={i.id} todoItem={i} todos={todos} setTodos={handleSave} />)}
    </div>
  )
}
