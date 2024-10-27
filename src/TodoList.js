// src/TodoList.js
import React from 'react';
import TodoItem from './TodoItem';
import useTodoStore from './store';

function TodoList() {
  const { todos, filter } = useTodoStore();

  // Filtering the todos based on the filter value
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
