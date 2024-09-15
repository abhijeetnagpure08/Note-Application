import React, { useState } from "react";
import "./AddNote.css";

export const AddNote = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    const payload = {
      title,
      body,
      category,
    };
    fetch("https://note-application-3-5nm9.onrender.com/notes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    setTitle("");
    setBody("");
    setCategory("");
  };
  return (
    <div className="container">
      <h3>Add a New Note</h3>
      <label htmlFor="title">Note Title</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="body">Note Body</label>
      <input
        type="text"
        name="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <label htmlFor="cat">Category</label>
      <input
        type="text"
        name="cat"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Note!</button>
    </div>
  );
};
