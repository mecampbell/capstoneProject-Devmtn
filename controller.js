const characters = require('./db.json');
let setId = 2;

module.exports = {
    getCharacters: (req, res) => res.status(200).send(characters),
    createCharacter: (req, res) => {
        let { name } = req.body;
        let newCharacter = {
            id: setId
        };
        characters.push(newCharacter);
        res.status(200).send(characters);
        setId++;
    },
    deleteCharacter: (req, res) => {
        let index = characters.findIndex(elem => elem.id === +req.params.id);
        characters.splice(index, 1);
        res.status(200).send(characters);
    }
};