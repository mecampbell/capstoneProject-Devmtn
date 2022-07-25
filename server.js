const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public/homepage')));

const { getCharacters, createCharacter, deleteCharacter } = require('./controller');

app.get(`/api/characters`, getCharacters);
app.post(`/api/characters`, createCharacter);
app.delete(`/api/characters/:id`, deleteCharacter);

const port = process.env.PORT || 5555;

app.listen(port, () => {
    console.log(`We're live on port ${port}`);
});