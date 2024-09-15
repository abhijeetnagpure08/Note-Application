import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateNote.css";

export const UpdateNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const { noteID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://note-application-3-5nm9.onrender.com/notes/${noteID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((note) => {
        setTitle(note.title);
        setBody(note.body);
        setCategory(note.category);
      });
  }, [noteID]);

  const handleSubmit = () => {
    const updatedNote = { title, body, category };

    fetch(`http://localhost:4500/notes/update/${noteID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedNote),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg);
        navigate("/notes"); // Navigate back to notes list
      });
  };

  return (
    <div className="update-container">
      <h2>Update Note</h2>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="body">Body</label>
      <input
        id="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <label htmlFor="category">Category</label>
      <input
        type="text"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button className="update-btn" onClick={handleSubmit}>
        Update Note
      </button>
    </div>
  );
};
