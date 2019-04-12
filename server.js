const express = require('express');
const server = express();
server.use(express.json());

let emptyGames = [];
let seededGames = [
  {
    id: 1,
    title: 'Morrowind', // required
    genre: 'RPG', // required
    releaseYear: 4567 // not required
  },
  {
    id: 2,
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
  },
  {
    id: 3,
    title: 'Mafia', // required
    genre: 'Party', // required
    releaseYear: null // not required
  }
];
let nextId = 4;


server.get('/games', (req, res) => {
  res.status(200).json(seededGames);
});

server.get('/emptygames', (req, res) => {
  res.status(200).json(emptyGames);
});

server.get('/games/:id', (req, res) => {
  let found = false;
  let game = {};
  seededGames.forEach(g => {
    if(g.id === parseInt(req.params.id, 10)) {
      found = true;
      game = g;
    }
  });
  if(found) {
    res.status(200).json(game);
  }
  else {
    res.status(404).json({ error: "Yo, this id doesn't exist." });
  }
});

server.delete('/games/:id', (req, res) => {
  seededGames.forEach(g => {
    if(g.id === parseInt(req.params.id, 10)) {
      const deleted = g;
      seededGames = seededGames.filter(d => d.id !== g.id);
      res.status(200).json(deleted);
    }
  });
  res.status(404).json({ error: "Yo, this id doesn't exist." });
});

server.post('/games', (req, res) => {
  const { id, title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ error: 'Please include a title and a genre.' });
  }
  else {
    seededGames.forEach(g => {
      if (g.title === title) {
        res.status(405).json({ error: 'No duplicate titles, please.' });
      }
    });
    const newGame = {
      id: nextId,
      title: title,
      genre: genre,
      releaseYear: releaseYear
    }
    emptyGames.push(newGame);
    nextId = nextId + 1;
    res.status(201).json(newGame);
  }
})

module.exports = server;