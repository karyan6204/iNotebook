const express = require('express'); // Importing express
const router = express.Router(); // Importing router from express
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes'); // Importing the Notes schema
const { body, validationResult } = require('express-validator'); // Importing validator for adding a note

// ROUTE 1: Fetch all notes of the user using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        // Find notes of the corresponding user
        const notes = await Notes.find({user:req.user.id});
        // sending notes as a response
        res.json(notes);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
      }
})

// ROUTE 2: Add a new note of the user using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser , [
    body('title','Enter valid title').isLength({ min: 3 }),
    body('description','Your description length is too small').isLength({ min: 5 }),
], async(req,res)=>{
    try {
        //If there are errors, return Bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {title,description,tags} = req.body; // Using destructuring method of javascript
        // New note object contains title,description,tags and user
        const note = new Notes({
            title,description,tags,user:req.user.id
        })
        const savedNotes = await note.save(); // Saving the note
        res.json(savedNotes); // Sending the note as a response
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
      }
})

// ROUTE 3: Update an existing note of the user using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser , async(req,res)=>{
    try {
        const {title,description,tags} = req.body; // Using destructuring method of javascript
        let newNote = {};   // Creating new note object
        // Assigning the title,description and tags to the newNote if they are found by destructuring
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tags){newNote.tags = tags};
        // Find a note to update and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};
        // Allow updation only if user owns this note
        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        }
        // Find the note and update it using the findByIdAndUpdate method which takes the params id as a argument
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        // Sending updated note as a response
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
      }
});

// ROUTE 4: Delete an existing note of the user using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser , async(req,res)=>{
    try {
        // Find a note to delete and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")};
        // Allow Deletion only if user owns this note
        if(note.user.toString() != req.user.id){
            return res.status(401).send("Not Allowed");
        }
        // Find the note and delete it using the findByIdAndDelete method which takes the params id as a argument
        note = await Notes.findByIdAndDelete(req.params.id);
        // Sending success message ande deleted note as a response
        res.json({"Success":"This note has been deleted",note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
      }
});

module.exports = router;