//import axios from 'axios'
const PORT = 8000
const axios = require('axios')
const express = require('express')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

const crypto = require('crypto');

const generateDailyTarget = () => {
  const hash = crypto.createHash('sha256');
  hash.update(new Date().toDateString());
  return parseInt(hash.digest('hex').substring(0, 5), 16) % 1000;  // Example: Targets between 0-999
}

const tiles = {
    easy: [1, 2, 3, 4],
    advanced: [1, 2, 3, 4, 5, 6],
    expert: [1, 2, 3, 4, 5, 6, 7, 8, 9]
}

app.get('/start', (req, res) => {
    //req.session.tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];  // Example: Initial tiles
    req.session.target = generateDailyTarget();
    req.session.attempts = req.session.attempts || {};
  
    res.json({
      target: req.session.target,
      tiles: req.session.tiles
    });
  });
  
app.get('/tiles', (req, res) => {
    const difficulty = req.query.difficulty;

    if (!difficulty || !tiles[difficulty]) {
        return res.status(400).json({ error: 'Invalid difficulty level provided.' });
    }

    return res.json({ tiles: tiles[difficulty],
                      target: generateDailyTarget() })
})

app.post('/attempt', (req, res) => {
    // Here you can handle the user's attempt at the game.
    // You'll have to validate their math, remove/add tiles, and check for win/lose conditions.
  });
  
app.get('/stats', (req, res) => {
    req.session.bestTime = '00:00' // hard coded for now
    req.session.lastScore = '00:00' //  hard coded for now
    req.session.last9Scores = [1,2,3,4,5,6,7,8,9]
    res.json({
        bestTime: req.session.bestTime,
        lastScore: req.session.lastScore
      });
})
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})

