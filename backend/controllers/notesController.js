import Note from "../models/Note.js";

export const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({author: req.user._id});
        res.status(200).json({ success: true, message: "All notes fetched successfully", data: notes });
    } catch (error) {
        console.error("Error fetching notes:", error);
        next(error);
    }
};

export const getNote = async (req, res, next) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, author: req.user._id });
        if(!note){
            return res.status(404).json({ success: false, message: "Note not found or unauthorized" });
        }
        res.status(200).json({ success: true, message: "Note fetched successfully", data: note });
    } catch (error) {
        console.error("Error fetching note:", error);
        next(error);
    }
};

export const createNote = async (req, res, next) => {
    try {
        const {title, content} = req.body;
        const newNote = await Note.create({title, content, author: req.user._id});
        res.status(201).json({ success: true, message: "Note created successfully", data: newNote });
    } catch (error) {
        console.error("Error creating note:", error);
        next(error);
    }
};

export const updateNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const userId = req.user._id; // From authorize middleware
        const {title, content} = req.body;

        // Find the note and check the ownership
        const note = await Note.findOne({ _id: noteId, author: userId });
        if(!note){
            return res.status(404).json({ success: false, message: "Note not found or unauthorized" });
        }

        // Update the note only allowed fields
        if (title !== undefined) note.title = title;
        if (content !== undefined) note.content = content;

        const updatedNote = await note.save();
        
        res.status(200).json({ success: true, message: "Note updated successfully", data: updatedNote });
    } catch (error) {
        console.error("Error updating note:", error);
        next(error);
    }
};

export const deleteNote = async (req, res, next) => {
    try {
        const noteId = req.params.id;
        const userId = req.user._id; // From authorize middleware

        // Find the note and check the ownership
        const note = await Note.findOneAndDelete({ _id: noteId, author: userId });
        if(!note){
            return res.status(404).json({ success: false, message: "Note not found or unauthorized" });
        }

        res.status(200).json({ success: true, message: "Note deleted successfully", data: note });
    } catch (error) {
        console.error("Error deleting note:", error);
        next(error);
    }
};
