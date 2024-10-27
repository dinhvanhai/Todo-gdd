// src/App.js
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import useTodoStore from './store';

function App() {
  const { todos, addTodo,loadTodo, clearCompleted, setFilter, filter, getFilteredTodos } = useTodoStore();
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.forEach((todo) => loadTodo({
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
    }));
  }, [addTodo]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
      </header>
      <TodoList />
      {todos?.length > 0 && (
        <footer className="footer">
       
        <div className="filters">
        <span className="todo-count">
          {todos.filter((todo) => !todo.completed).length} items left
        </span>
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'selected' : ''}>
            All
          </button>
          <button onClick={() => setFilter('active')} className={filter === 'active' ? 'selected' : ''}>
            Active
          </button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'selected' : ''}>
            Completed
          </button>
          <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
        </div>
      </footer>
      )}
      
    </div>
  );
}

export default App;
