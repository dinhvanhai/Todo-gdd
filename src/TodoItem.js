import React, { useState } from 'react';
import useTodoStore from './store';

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const { toggleTodo, deleteTodo } = useTodoStore();

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      todo.text = editText; 
      setIsEditing(false);
    }
  };

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <label onDoubleClick={handleEdit}>{todo.text}</label>
        {/* <button className="destroy" onClick={() => deleteTodo(todo.id)} >delete</button> */}
      </div>
      {isEditing && (
        <input
          className="edit"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={saveEdit}
          onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
        />
      )}
    </li>
  );
}

export default TodoItem;
