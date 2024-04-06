const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


// **** Endpoint for fetching all notes of particular user
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json({ notes });
    } catch (err) {
        console.log(err)
        res.send({ "error": "Internal Server Error" })
    }
})

// **** Endpoint for adding note of a particular user
router.post('/addnote',
    [
        body('title', "Title must not be empty").exists(),
        body('description', "Description must not be empty").exists(),
        body('tag', "Tag must not be empty").exists()
    ], fetchuser, async (req, res) => {

        // **** Cheching for any validation errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }

        try {
            const { title, description, tag } = req.body;

            // **** Creating new note and add if no errors
            const note = await Note.create({
                title: title,
                description: description,
                tag: tag,
                user: req.user.id
            });

            res.json(note)
        } catch (err) {
            console.log(err)
            res.send({ "error": "Internal Server Error" })
        }
    })


// **** Endpoint for updating note of a particular user
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // **** Creating a new note object to update the existing note
        const newNote = {};
        if (title) {newNote.title = title};
        if (description) {newNote.description = description};
        if (tag) {newNote.tag = tag};

        // **** Checking whether note to be updated exists or not
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found");
        }

        // **** Checking whether user owns the note it want to update
        if(note.user.toString() !== req.user.id){
            return res.send("Your are not allowed to delete this note");
        }

        // **** Updating the note
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});

        res.json(updatedNote)
    } catch (err) {
        console.log(err)
        res.send({ "error": "Internal Server Error" })
    }
})


// **** Endpoint for deleting note of a particular user
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // **** Checking whether note to be deleted exists or not
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Note not found");
        }

        // **** Checking whether user owns the note it want to delete
        if(note.user.toString() !== req.user.id){
            return res.send("Your are not allowed to delete this note");
        }

        // **** deleting the note
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        res.json({"Success" : "Note deleted successfully", "deletedNote" : deletedNote});
    } catch (err) {
        console.log(err)
        res.send({ "error": "Internal Server Error" })
    }
})

module.exports = router;