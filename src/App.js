// src/App.js
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import useTodoStore from './store';

function App() {
  const { todos, addTodo, clearCompleted, setFilter, filter, getFilteredTodos } = useTodoStore();
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.forEach((todo) => addTodo(todo.text));
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
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
      </header>
      <TodoList />
      <footer className="footer">
        <span className="todo-count">
          {todos.filter((todo) => !todo.completed).length} items left
        </span>
        <div className="filters">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'selected' : ''}>
            All
          </button>
          <button onClick={() => setFilter('active')} className={filter === 'active' ? 'selected' : ''}>
            Active
          </button>
          <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'selected' : ''}>
            Completed
          </button>
        </div>
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    </div>
  );
}

export default App;
