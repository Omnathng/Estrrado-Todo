import React, { useState, useRef, useEffect } from 'react';
import './style.css';

function Main() {
  const mainDivRef = useRef(null);
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = () => {
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNotes(filteredNotes);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNotes(filteredNotes);
  };

  const handleTitle = (e) => {
    setNoteDetails((prevNoteDetails) => ({
      ...prevNoteDetails,
      title: e.target.value,
    }));
  };

  const handleDescription = (e) => {
    setNoteDetails((prevNoteDetails) => ({
      ...prevNoteDetails,
      description: e.target.value,
    }));
  };

  const handleAdd = () => {
    const { title, description } = noteDetails;
    if (title.trim() !== "" && description.trim() !== "") {
      setNotes([...notes, { title, description }]);
      setNoteDetails({
        title: "",
        description: "",
      });
      setShowSecondInput(false);
    }
  };

  const handleDelete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
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
          <a className="navbar-brand">BlogL</a>
          <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
            <div className='pt-2 pb-2 ps-3 pe-3 d-flex' style={{border:'1px solid #ccc',borderRadius:'25px'}}>
              <input
                type="text"
                style={{width:'400px',border:'0',outline:"0",background:'transparent'}}
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
              placeholder='Title'
              value={noteDetails.title}
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
            value={noteDetails.description}
            onChange={handleDescription}
          />
        </div>
      </div>

      {/* Display Notes */}
      <div className="notes-list  m-3 d-flex flex-wrap">
        {notes.map((note, index) => (
          <div key={index} className="note-card m-3 p-3" style={{ border: '1px solid #ccc', borderRadius: '10px' }}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button className='btn btn-outline-dark' onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
