const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/notes')
    .then(() => {
        console.log('connected to mongodb');
    })
    .catch((err) => {
        console.log('error connecting to mongodb', err);
    });

const noteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    body: String,
});

const Note = mongoose.model('notes', noteSchema);

app.post('/notes', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        subject: req.body.subject,
        body: req.body.body,
    });
    await note.save();
    res.send(note);
});
app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.send(notes);
});

const server = app.listen(PORT, () => {
    console.log('server is running on 5001');
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process Terminated');
    });
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Process Terminated');
    });
});