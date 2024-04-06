import React from 'react'

function Noteitem(props) {

    const handleDeleteNote = () =>{
        props.deleteNote(props.note._id, props.note.title, props.note.description, props.note.tag);
    }

    const handleUpdateNote = () =>{
        props.updateNote(props.note._id, props.note.title, props.note.description, props.note.tag)
    }

    return (
        <div className="card my-3">
            <div className="card-body">
                <div className='d-flex align-items-centre justify-content-between'>
                    <h5 className="card-title">{props.note.title}</h5>
                    <div>
                        <i className="fa-solid fa-trash-can iconHover" onClick={handleDeleteNote}></i>
                        <i className="fa-solid fa-pen-to-square iconHover" onClick={handleUpdateNote}></i>
                    </div>

                </div>
                <p className="card-text">{props.note.description}</p>
                <p className="card-text">{props.note.tag}</p>

            </div>
        </div>
    )
}

export default Noteitem