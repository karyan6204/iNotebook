import React, { useContext, useRef } from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../Context/NoteContext'; // Importing NoteContext
import AddNote from './AddNote';
import Noteitem from './Noteitem'; // Importing Noteitem

const Notes = (props) => {
  const context = useContext(NoteContext); // Using useContext to store the context from NoteContext in context
  const navigate = useNavigate();
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }
    else{
      navigate("/login");
    }
    
    // eslint-disable-next-line
}, [])
const ref = useRef(null)
const refClose = useRef(null)
const [note, setNote] = useState({id:"",etitle: "", edescription: "", etags: ""})

const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etags:currentNote.tags})
}

const handleClick = (e)=>{
    console.log("Updating the note...", note)
    editNote(note.id,note.etitle,note.edescription,note.etags);
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
}

const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} minLength={5} required aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} minLength={5} required onChange={onChange} />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="tags" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etags" name="etags" value={note.etags} minLength={5} required onChange={onChange} />
                </div> */}

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-3">
          <h1>Your Notes</h1>
          {/* Mapping the notes from notes in Noteitem */}
          <div className="container mx-2">
          {notes.length === 0 && 'No Notes to Display'}
          </div>
          {notes.map((noteS) => {
            return (
              <Noteitem key={noteS._id} updateNote={updateNote} showAlert={props.showAlert} notes={noteS} />
            )})}
        </div>
      </div>
    </>
  )
}

export default Notes
