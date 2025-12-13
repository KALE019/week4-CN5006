const express = require("express");
const mongoose = require("mongoose");
let Books = require('./booksSchema');
const connectDB = require('./mongodbConnect');  
const cors = require('cors');

console.log("Server2k25");

var app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

console.log("BOOKS", Books);

// Default route
app.get('/', function(req, res) {
    console.log("this is default");
    res.send("This is default");
});

// About route
app.get('/about', async function(req, res) {
    res.send("mongodb express React and mongoose app, React runs in another application");
    try {
        const count = await Books.countDocuments();
        console.log("Total documents Count before addition:", count);
    } catch (err) {
        console.error(err);
    }
});

// ==================== REST API ENDPOINTS ====================

// 1. Get all books
app.get('/allbooks', async (req, res) => {
    try {
        const d = await Books.find();
        return res.json(d);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get a single book by ID
app.get('/getbook/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const book = await Books.findById(id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        console.log("found book", book);
        res.json(book);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Add a new book
app.post('/addbooks', async (req, res) => {
    try {
        let newbook = new Books(req.body);
        console.log("newbook->", newbook);

        await newbook.save();

        res.status(200).json({ message: 'Book added successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).send('Adding new book failed');
    }
});

// 4. Update a book by ID
app.post('/updatebook/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const update = {
            booktitle: req.body.booktitle,
            PubYear: req.body.PubYear,
            author: req.body.author,
            Topic: req.body.Topic,
            format: req.body.format
        };

        console.log("Update request:", { id, update });

        const updatedBook = await Books.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        return res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook
        });

    } catch (err) {
        console.error('Update error:', err);
        return res.status(500).json({
            error: 'Failed to update book',
            details: err.message
        });
    }
});

// 5. Delete a book by ID
app.post('/deleteBook/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Deleting book:", id);

        const deletedBook = await Books.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).send('Book Deleted');

    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({
            error: 'Failed to delete book',
            details: err.message
        });
    }
});

// ==================== START SERVER ====================
(async () => {
    await connectDB(); // Connect to MongoDB
    app.listen(5000, () => console.log('Server running on port 5000'));
})();
