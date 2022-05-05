const Note = ({ note, deleteNote, updateNote }) => {
    return (
        <>
            <li>{note.content}</li>
            <button onClick={updateNote}>Update</button>
            <button onClick={deleteNote}>Delete</button>
        </>

    )
}

export default Note