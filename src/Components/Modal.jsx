import React from 'react';

const Modal = ({ todo, onClose, onToggleStatus }) => {
  if (!todo) {
    return null;
  }

  return (
    <div>
      <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        View Details
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Todo Details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p>Title: {todo.title}</p>
              <p>Description: {todo.description}</p>
              <p>Status: {todo.completed ? 'Completed' : 'Incomplete'}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={()=>onToggleStatus(todo)}>
                {todo.completed ? 'Mark Incomplete' : 'Mark Completed'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
