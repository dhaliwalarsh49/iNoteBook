import noteContext from "./noteContext";
import { useState } from "react";

const host = "http://localhost:5000/api/notes"

const NoteState = (props) => {

    const [notes, setNotes] = useState([]);

    const [err, setErr] = useState(null);

    const fetchNotes = async () => {
        try {
            // **** Fetching notes from database by api call
            const response = await fetch(`${host}/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('authToken')
                }
            })
            const notes_json = await response.json();
            setNotes(notes_json.notes);
        } catch (error) {
            setErr({type : "danger", msg : "Internal Error ! Try Reloading the Page"});
        }
    }

    const addNote = async (title, description, tag) => {

        const note = {
            "title": title,
            "description": description,
            "tag": tag
        }

        // **** Adding note to database by api call
        const response = await fetch(`${host}/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
            },
            body: JSON.stringify(note)
        })
        const addedNote_json = await response.json();

        // **** Adding note to frontend
        setNotes(notes.concat(addedNote_json));
    }

    const deleteNote = async (id) => {
        // **** Deleting note from database by api call
        const response = await fetch(`${host}/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
            }
        })
        const deletedNote_json = await response.json();
        console.log(deletedNote_json)

        // **** Deleting note from frontend
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    const updateNote = async (id, title, description, tag) => {
        const note = {
            "title": title,
            "description": description,
            "tag": tag
        }

        // **** Updating note in database by api call
        const response = await fetch(`${host}/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
            },
            body: JSON.stringify(note)
        })
        const updatedNote_json = await response.json();

        // **** Adding updated note to frontend
        const newNotes = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === id) {
                newNotes[i].title = updatedNote_json.title;
                newNotes[i].description = updatedNote_json.description;
                newNotes[i].tag = updatedNote_json.tag;
            }
        }
        setNotes(newNotes);
    }

    return (
        <noteContext.Provider value={{ notes, fetchNotes, addNote, deleteNote, updateNote, err }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;