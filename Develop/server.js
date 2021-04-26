const express = require("express");
const nodemon = require("nodemon");
const http = require("http");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");
const uniquid = require("uniqid")
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

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

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uniquid();
    
    database.push(newNote);
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(database), (err) => {
        if (err) throw err;
    })
    res.json(true);
});

// app.post('/api/clear', (req, res) => {
//   // Empty out the arrays of data
//   tableData.length = 0;
//   waitListData.length = 0;

//   res.json({ ok: true });
// });





// If no matching route is found default to home
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});
