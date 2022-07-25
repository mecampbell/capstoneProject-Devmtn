// const archives = require('./db.json');
let archives = ["Michael"]

module.exports = {
    getMaster: (req, res) => {      
        let masters = ["Yoda", "Obi-Wan Kenobi", "Qui-Gon Jinn", "Anakin Skywalker", "Count Dooku", "Darth Maul", "Kylo Ren", "Darth Revan", "Emperor Palpatine"];

        let randomIndex = Math.floor(Math.random() * masters.length);
        let randomMaster = masters[randomIndex];

        res.status(200).send(randomMaster)
    },
    getArchives: (req, res) => {
        res.status(200).send(archives);
    },
    addArchive: (req, res) => {
        let { name } = req.body;
        let newArchive = {
            name
        };
        archives.push(newArchive);
        res.status(200).send(archives)
    }
};