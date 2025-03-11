// import React, { useContext, useEffect,useRef } from "react";
// import noteContext from "../context/notes/noteContext";
// import Noteitem from "./Noteitem";
// import AddNote from "./AddNote";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// const Notes = () => {
//   const context = useContext(noteContext);
//   const { notes, getNotes} = context;

//   useEffect(() => {
//     getNotes();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])
//   const ref=useRef(null)
//   const updateNote=(note)=>{
//       ref.current.click();
//   }


//   return (
//     <>
//       <AddNote />
//       <button ref={ref} type="button"   class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//       Launch demo modal
//     </button>
// <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>
//       <div className="row my-3">
//         <h2>Your Notes</h2>
//         {notes.length > 0 ? (
//           notes.map((note) => <Noteitem key={note._id} updateNote={updateNote} note={note} />)
//         ) : (
//           <p>No notes available.</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Notes;

import { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  let navigate=useNavigate ();
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ref = useRef(null);
  const refClose=useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }

  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showalert("Updated successfully","success");
  }

  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }

  return (
    <>
      <AddNote showalert={props.showalert}/>
      {/* Hidden button to trigger modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch Modal
      </button>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close">
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle}  name="etitle" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <textarea className="form-control" id="etag" name="etag" value={note.etag}  onChange={onChange} ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      {/* Display Notes */}
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length > 0 ? (
          notes.map((note) => <Noteitem key={note._id} showalert={props.showalert} updateNote={updateNote} note={note} />)
        ) : (
          <p>No notes available.</p>
        )}
      </div>
    </>
  );
};

export default Notes;
