import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://backend2-tw3m.onrender.com";
  //const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);


  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
  
      const json = await response.json();
      console.log("Fetched notes:", json); // Debugging log
  
      // ✅ If json is an object, extract the notes array
      if (json.notes && Array.isArray(json.notes)) {
        setNotes(json.notes);
      } else if (Array.isArray(json)) {
        setNotes(json); // ✅ Ensure it is an array
      } else {
        console.error("Unexpected API response format:", json);
        setNotes([]); // Prevent crashes
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]); // Handle API failure
    }
  };
    

  // Add a Note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      console.log('getting..')
      const json = await response.json();
      setNotes([...notes, json]); // Add new note from response
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      console.log(response);
      // const json = await response.json();
      let newNotes=JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
  
      }
      setNotes(newNotes)


}
catch (error) {
  console.error("Error updating note:", error);
}


};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
