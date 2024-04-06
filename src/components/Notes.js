import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../contexts/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import alertContext from '../contexts/alerts/alertContext';
import { useNavigate } from 'react-router-dom';

function Notes() {
    const notesAndMethods = useContext(noteContext);
    const alertObj = useContext(alertContext);
    const navigate = useNavigate();

    const [note, setNote] = useState({eid : "", etitle : "", edescription : "", etag : ""})

    useEffect(() => {
        if(localStorage.getItem('authToken')){
            notesAndMethods.fetchNotes();
            if(notesAndMethods.err){
                alertObj.showAlert(notesAndMethods.err.msg, notesAndMethods.err.type);
            }
        }
        else{
            navigate('/login');
        }
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const refDelete = useRef(null)
    const refCloseDelete = useRef(null)

    const handleChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    const deleteNote = (id, title, description, tag) =>{
        setNote({...note, eid: id, etitle: title, edescription : description, etag : tag});
        refDelete.current.click();
    }

    const handleDelete = () => {
        notesAndMethods.deleteNote(note.eid)
        refCloseDelete.current.click();
        alertObj.showAlert("Note Deleted Successfully", "success");
    }

    const updateNote = (id, title, description, tag) =>{
        setNote({...note, eid: id, etitle: title, edescription : description, etag : tag});
        ref.current.click();
    }

    const handleUpdate = () =>{
        notesAndMethods.updateNote(note.eid, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        alertObj.showAlert("Note Updated Successfully", "success");
    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#modalUpdate">
                Launch Edit modal
            </button>

            <div className="modal fade" id="modalUpdate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleChange} autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} autoComplete="off" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Cancel</button>
                            <button disabled={note.etitle.length < 1 || note.edescription.length < 1 || note.etag.length < 1} type="button" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <button ref={refDelete} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#modalDelete">
                Launch Delete modal
            </button>

            <div className="modal fade" id="modalDelete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Deletion</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} disabled/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription}  disabled/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag}  disabled/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refCloseDelete}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <Addnote addNote={notesAndMethods.addNote} />
            <hr />
            <div className='my-3 row'>
                <h2>Your Notes</h2>
                {notesAndMethods.notes.length === 0 ? <h6>No notes Avalailable! Add a note to view</h6> : notesAndMethods.notes.map((note) => {
                    return <div className='col-md-4' key={note._id}> <Noteitem note={note} deleteNote={deleteNote} updateNote={updateNote}/> </div>
                })}
            </div>
        </>
    )
}

export default Notes