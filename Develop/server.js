const express = require("express");
const nodemon = require("nodemon");
const http = require("http");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");
// const uniqueid = require("uniqeid")
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



app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    
    database.push(newNote);
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
