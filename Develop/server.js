const express = require("express");
const nodemon = require("nodemon");
const http = require("http");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


require('./public/assets/js/index')(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});



// If no matching route is found default to home
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});
