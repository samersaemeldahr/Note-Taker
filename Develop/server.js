const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");
const uniqid = require("uniqid")
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


// API get requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(database));

app.get('/api/notes:id', (req, res) => {
    const chosen = req.params.id;

    for (let i = 0; i < database.length; i++) {
        if (chosen === database[i].id) {
            return res.json(database[i]);
        }
    }
})


// API post requests
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uniqid();
    
    database.push(newNote);
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(database), (err) => {
        if (err) throw err;
    })
    res.json(true);
});

// If no matching route is found default to home
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// listener
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});
