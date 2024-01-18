// taskContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TodoContext = createContext();

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodos = [...state.todos, action.payload];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    case 'REMOVE_TODO':
      const updatedTodos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    case 'SET_TODOS':
      localStorage.setItem('todos', JSON.stringify(action.payload));
      return { todos: action.payload };
    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {

  }, []);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export { TodoProvider, useTodo };
