import React, { useState, useEffect } from 'react';
import { createNote, fetchNotes } from './api';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const getNotes = async () => {
      try {
        const getNotesFromServer = await fetchNotes();
        setNotes(getNotesFromServer);
      } catch (error) {
        console.log('error getting notes', error);
        throw error;
      };
    };
    getNotes();
  }, []);

  const handleSaveNote = async() => {
    const newNote = { title, subject, body };
    try {
      const savedNote = await createNote(newNote);
      setNotes([...notes, savedNote]);
      setTitle('');
      setSubject('');
      setBody('');
    } catch (error) {
      console.log('error saving note', error);
      };
  };

  return (
  <div>
    <h1>Note App</h1>
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
    </div>
    <div>
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
    </div>
    <div>
      <input
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        />
    </div>
    <button onClick={handleSaveNote}>Save Note</button>
    
    <h2> Saved Notes</h2>
    <ul>
      {notes.map((note, index) => (
        <li key={index}>
          <h3>{note.title}</h3>
          <h4>{note.subject}</h4>
          <p>{note.body}</p>
        </li>
      ))}
    </ul>
  </div>
  );
}
export default App;
