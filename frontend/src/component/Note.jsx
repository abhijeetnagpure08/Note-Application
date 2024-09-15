import React, { useEffect, useState } from "react";
import "./Note.css";
import { useNavigate } from "react-router-dom";

export const Note = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch("http://localhost:4500/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setNotes(res));
  };

  const handleDelete = (noteID) => {
    fetch(`http://localhost:4500/notes/delete/${noteID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);
        fetchNotes();
      });
  };

  const handleUpdate = (noteID) => {
    navigate(`/update/${noteID}`);
  };

  return (
    <div className="notes-container">
      <h2>These are the current notes</h2>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <span className="note-category">Category: {note.category}</span>
            <button className="edit-btn" onClick={() => handleUpdate(note._id)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(note._id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};
