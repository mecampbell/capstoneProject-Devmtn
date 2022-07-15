const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/homepage/index.html"));
});

// app.get("/styles", function(req, res) {
//     res.sendFile(path.join(__dirname, "/public/homepage/styles.css"));
// });

// app.get("/js", function(req, res) {
//     res.sendFile(path.join(__dirname, "/public/homepage/script.js"));
// });

const port = process.env.PORT || 5555;

app.listen(port, () => {
    console.log(`We're live on port ${port}`);
});