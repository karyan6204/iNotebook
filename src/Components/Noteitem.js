import React, {useContext} from 'react'
import NoteContext from '../Context/NoteContext';

const Noteitem = (props) => {
    const context = useContext(NoteContext); // Using useContext to store the context from NoteContext in context
    // we are taking deleteNote from the Context with the help of the destructing method of Javascript.
    const {deleteNote} = context; 
    const {notes,updateNote} = props; // Destructuring method 
  return (
    <div className = "col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{notes.title}</h5>
            {/* we have added the onClick listener and have provided it with the delete Note function to delete the note by ID. */}
            <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(notes._id);
              props.showAlert('Deleted Successfully','success')}}></i>
            <i className="far fa-edit mx-2" onClick={()=>{updateNote(notes)}}></i>
          </div>
            <p className="card-text">{notes.description}</p>
        </div>
    </div>
    </div>
  )
}

export default Noteitem
