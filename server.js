const express = require('express');
const server = express();
server.use(express.json());

let emptyGames = [];
let seededGames = [
  {
    title: 'Morrowind', // required
    genre: 'RPG', // required
    releaseYear: 4567 // not required
  },
  {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
  },
  {
    title: 'Mafia', // required
    genre: 'Party', // required
    releaseYear: null // not required
  }
];

server.get('/games', (req, res) => {
  res.status(200).json(seededGames);
});

server.get('/emptygames', (req, res) => {
  res.status(200).json(emptyGames);
});

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.status(422).json({ error: 'Please include a title and a genre.' });
  }
  else {
    const newGame = {
      title: title,
      genre: genre,
      releaseYear: releaseYear
    }
    emptyGames.push(newGame);
    res.status(201).json(newGame);
  }
})

module.exports = server;