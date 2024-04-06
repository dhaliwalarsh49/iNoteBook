import React, {useState, useContext} from 'react'
import alertContext from '../contexts/alerts/alertContext';

function Addnote(props) {

    const [note, setNote] = useState({title : "", description : "", tag : ""})
    const alertObj = useContext(alertContext);

    const handleAddNote = (e) =>{
        e.preventDefault();
        props.addNote(note.title, note.description, note.tag);
        alertObj.showAlert("Note Added Successfully", "success");
        setNote({title : "", description : "", tag : ""});
    }

    const handleChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <h2>Add a Note</h2>
            <form className='my-3' onSubmit={handleAddNote}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={handleChange} autoComplete="off" value={note.title} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description"  onChange={handleChange} autoComplete="off" value={note.description} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag"  onChange={handleChange} autoComplete="off" value={note.tag} required/>
                </div>

                <button type="submit" className="btn btn-primary">ADD</button>
            </form>
        </div>
    )
}

export default Addnote