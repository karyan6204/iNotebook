import { useState } from "react";
import NoteContext from "./NoteContext"; // Importing NoteContext which we have created for using the context in any components.
const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial);

      // Get all note
      const getNote = async()=>{
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
      }

      // Add a note
      const addNote = async(title, description, tags)=>{
        console.log("Adding a note");
        // TODO API call
        // API Call
        const response = await fetch(`${host}/api/notes/addNote`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tags})
        });
        const note = response.json();
        setNotes(notes.concat(note));
        // we have concat the ‘note’ in the new Notes array, and have updated the Note State. Hence, we have successfully created an Add note function in the NoteState context. 
      }

      // Edit a note
      const editNote = async(id, title, description, tag)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json',
            "auth-token": localStorage.getItem('token')
          },
          body:JSON.stringify({title,description,tag})
        });
        const json = response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tags = tag;
            break;
          }
        }
        setNotes(newNotes);
      }

      // Delete a note
      const deleteNote = async(id)=>{
        // TODO API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = response.json();
        console.log(json);
        console.log("Deleting a note with id "+id);
        // we have used the filter method to create a new array with all the elements that pass the test successfully. In our case, if note.id is not equal to Id then it will pass the test and would remain in the new notes
        const newNote = notes.filter((notes)=>{return notes._id !== id});
        setNotes(newNote);
        
      }

    return(
        // Using NoteContext.Provider to pass the state and update to all the components
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNote}}>
            {/* Writing prop.children to provide the value of our state to every children of our components using the context API we created in NoteContext.js */}
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;