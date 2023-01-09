import React,{useContext,useState} from "react";
import NoteContext from "../Context/NoteContext";

const AddNote = (props) => {
    const context = useContext(NoteContext); // Using useContext to store the context from NoteContext in context
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tags:""});
    // we would be assigning the ‘handleClick’ function to the onClick event of the button, which means that on clicking the button the handleClick function will be invoked. 
    const handleClick = (e)=>{
        e.preventDefault(); // This is used so that page do not reload on clicking
        addNote(note.title,note.description,note.tags);
        props.showAlert('Added Successfully','success')
        setNote({title:"", description:"", tags:""});
    }
    // The onchange event occurs when the value of an element has been changed. Now, we would be assigning the ‘onChange’ function to the onChange event of the Title and the description field, having type as text. However, to use the ‘onchange’ function we have to first create it
    const onChange = (e)=>{
        // Above, All the values inside the note object will remain on executing the ‘onchange’ function. But, the properties written after the note will be added or overwritten. Consequently, we are using the target property to change the name, that is ‘description’ text, to the value of ‘onchange’. Remember, we are taking ‘e’ of the event as a parameter.
        setNote({...note,[e.target.name]: e.target.value})
    }

  return (
    <div className="container my-3">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"  onChange={onChange} value={note.title}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
          Description
          </label>
          <input type="text" className="form-control"  id="description" name="description" onChange={onChange} value={note.description}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
          Tag
          </label>
          <input type="text" className="form-control"  id="tags" name="tags" onChange={onChange} value={note.tags} />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add a note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
