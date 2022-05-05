import Note from './component/Note'
import { useState } from 'react';

const App = ({ notes }) => {
  const [note, setNotes] = useState(notes);
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [isUpdate, setIsUpdate] = useState(null);

  const addNote = (event) => {
    event.preventDefault();
    setNotes([...note, noteObject(newNote)]);
    setNewNote(' ')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const deleteNote = (event) => {
    const notesUpdated = note.filter(note => note.id !== event);
    setNotes(notesUpdated);
    setNewNote('');
  }

  const updateNote = (event) => {
    setIsUpdate(event.id);
    setNewNote(event.content);
  }

  const SubmitUpdate = (event) => {
    event.preventDefault();
    const noteFound = note.findIndex(note => note.id === isUpdate);
    note[noteFound] = noteObject(newNote);
    setNotes(note);
    setIsUpdate(null);
    setNewNote('');
  }

  const noteObject = (newNote) => {
    return {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: note.length + 1,
    }
  }

  return (
    <>
      <div>
        <h1>Notes</h1>
        <ul>
          {note.map(note =>
            <Note key={note.id}
              note={note}
              deleteNote={() => deleteNote(note.id)}
              updateNote={() => updateNote(note)} />
          )}
        </ul>
      </div>
      <form onSubmit={isUpdate ? SubmitUpdate : addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">{isUpdate ? 'UPDATE' : 'SAVE'}</button>
      </form>
    </>
  )
}

export default App