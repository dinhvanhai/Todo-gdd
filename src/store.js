import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [],
  filter: 'all',

  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, completed: false }],
    })),

  loadTodo: (items) =>
    set((state) => ({
      todos: [...state.todos, items],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.completed),
    })),

  setFilter: (filter) => set({ filter }),

  getFilteredTodos: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => {
        if (state.filter === 'all') return true;
        if (state.filter === 'active') return !todo.completed;
        if (state.filter === 'completed') return todo.completed;
        return true;
      }),
    })),
}));

export default useTodoStore;
