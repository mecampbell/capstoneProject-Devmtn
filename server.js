const express = require("express");
const cors = require("cors");
const path = require("path");
// const characters = require('./db.json');
// let setId = 2;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public/homepage')));

// app.get(`/api/characters`, (req, res) => {
//     res.status(200).send(characters);
// });
// app.post(`/api/characters`, (req, res) => {
//     let { first_name, last_name, character_class, imageURL } = req.body;
//     let newCharacter = {
//         id: setId,
//         first_name,
//         last_name,
//         character_class,
//         imageURL
//     };
//     characters.push(newCharacter);
//     res.status(200).send(characters);
//     setId++;
// });
// app.delete(`/api/characters/:id`, (req, res) => {
//     let index = houses.findIndex(elem => elem.id === + req.params.id);
//     houses.splice(index, 1);
//     res.status(200).send(characters);
// });

const port = process.env.PORT || 5555;

app.listen(port, () => {
    console.log(`We're live on port ${port}`);
});