const fs = require('fs');
const path = require('path');
const express = require('express');
const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incming JSON data
app.use(express.json());
//route to front end public folder
app.use(express.static('public'));

app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//catch all/wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//post route callback
app.post('/api/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

//11.3.4. adding html route /animals
app.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, './public/index.html'));
});

//11.3.6
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

//this should always be last
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});