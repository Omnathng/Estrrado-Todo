import React, { useState, useRef, useEffect } from 'react';
import { useTodo } from '../context/taskContext';
import { v4 as uuidv4 } from 'uuid';
import { Modal, Button } from 'react-bootstrap';
import './style.css';
import logo from '../assets/Logo.jpeg';

function Main() {
  const { state, dispatch } = useTodo();
  const mainDivRef = useRef(null);
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleToggleStatus = () => {
    if (selectedTodo) {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === selectedTodo.id ? { ...todo, completed: !todo.completed } : todo
      );

      dispatch({ type: 'SET_TODOS', payload: updatedTodos });
      setShowModal(false);
    }
  };

  const [todoDetails, setTodoDetails] = useState({
    title: "",
    description: "",
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleSearchButtonClick = () => {
    const filteredTodos = state.todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch({ type: 'SET_TODOS', payload: filteredTodos });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredTodos = state.todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch({ type: 'SET_TODOS', payload: filteredTodos });
  };

  const handleTitle = (e) => {
    setTodoDetails((prevTodoDetails) => ({
      ...prevTodoDetails,
      title: e.target.value,
    }));
  };

  const handleDescription = (e) => {
    setTodoDetails((prevTodoDetails) => ({
      ...prevTodoDetails,
      description: e.target.value,
    }));
  };

  const handleAdd = () => {
    const { title, description } = todoDetails;
    if (title.trim() !== "" && description.trim() !== "") {
      const newTodo = {
        id: uuidv4(), // Generate a unique ID
        title,
        description,
        completed: false, // Initial status is incomplete
      };

      dispatch({
        type: 'ADD_TODO',
        payload: newTodo,
      });

      setTodoDetails({
        title: "",
        description: "",
      });
      setShowSecondInput(false);
    }
  };

  const handleDelete = (id) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  const expandInput = () => {
    setShowSecondInput(true);
  };

  const handleClickOutside = (event) => {
    if (mainDivRef.current && !mainDivRef.current.contains(event.target)) {
      console.log("Clicked outside");
      setShowSecondInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={mainDivRef} className="main-container d-flex flex-column" style={{ width: '100%' }}>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <img src={logo} alt="" />
          <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
            <div className='pt-2 pb-2 ps-3 pe-3 d-flex' style={{ border: '1px solid #ccc', borderRadius: '25px' }}>
              <input
                type="text"
                style={{ width: '400px', border: '0', outline: "0", background: 'transparent' }}
                placeholder='Search'
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className='icn' onClick={handleSearchButtonClick}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </form>
        </div>
      </nav>
      {/* Second input */}
      <div className="notes-container m-5 pt-2 ps-2 pe-2" style={{ width: '25%', alignItems: 'center', border: '1px solid #ccc', borderRadius: '25px', marginLeft: '200px' }}>
        {showSecondInput && (
          <div className="d-flex justify-content-between w-100 mt-2">
            <input
              type="text"
              style={{ width: '100%', border: '0', outline: "0", background: 'transparent' }}
              placeholder='Enter a Task'
              value={todoDetails.title}
              onChange={handleTitle}
            />
            <i onClick={handleAdd} className="fa-solid fa-check"></i>
          </div>
        )}

        {/* Take a note */}
        <div className="d-flex justify-content-between w-100 mt-3 mb-2">
          <input
            onClick={expandInput}
            type="text"
            style={{ width: '100%', border: '0', outline: "0", background: 'transparent' }}
            placeholder='Add the Content'
            value={todoDetails.description}
            onChange={handleDescription}
          />
        </div>
      </div>

      <div className="todos-list  m-3 d-flex flex-wrap">
        {state.todos.map((todo) => (
          <div key={todo.id} className="note-card m-3 p-3" style={{ border: '1px solid #ccc', borderRadius: '10px' }}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <div className={`status ${todo.completed ? 'completed' : 'incomplete'}`}>
              {todo.completed ? 'Completed' : 'Incomplete'}
            </div>
            <button className='btn btn-outline-dark' onClick={() => handleDelete(todo.id)}>Delete</button>
            {/* Use the same button to open the modal and pass the todo details */}
            <button className='btn btn-outline-dark' onClick={() => handleViewDetails(todo)}>View Details</button>
          </div>
        ))}
      </div>

      {/* React Bootstrap Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Todo Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Title: {selectedTodo && selectedTodo.title}</p>
          <p>Description: {selectedTodo && selectedTodo.description}</p>
          <p>Status: {selectedTodo && (selectedTodo.completed ? 'Completed' : 'Incomplete')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleToggleStatus}>
            {selectedTodo && (selectedTodo.completed ? 'Mark Incomplete' : 'Mark Completed')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Main;
