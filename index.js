const { Client } = require('pg');
require('dotenv').config()
//const pool = new Pool()
const client = new Client({
  user: process.env.PGUSER,
})


const PORT = 8000
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const app = express()
 
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to database');
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
}

connectToDatabase();

async function getScores() {
  try {
    const res = await client.query('SELECT * FROM users');
    //console.log(res.rows);
    //console.log('Successfully retrieved scores', res.rows[0].name);
    return res.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

const crypto = require('crypto');
const { get } = require('http');

const generateDailyTarget = (difficulty) => {
  const hash = crypto.createHash('sha256');
  hash.update(new Date().toDateString());
  return parseInt(hash.digest('hex').substring(0, 5), 16) % difficulty;  // Example: Targets between 0-999
}

const tiles = {
    goal : {
      easy: generateDailyTarget(10),
      advanced: generateDailyTarget(100),
      expert: generateDailyTarget(1000)},
    tiles:{
      easy: [1, 2, 3, 4],
      advanced: [1, 2, 3, 4, 5, 6],
      expert: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
}
  
app.get('/tiles', (req, res) => {
    const difficulty = req.query.difficulty;

    if (!difficulty || !tiles.tiles[difficulty]) {
        return res.status(400).json({ error: 'Invalid difficulty level provided.' });
    }

    return res.json({ tiles: tiles.tiles[difficulty],
                      target: tiles.goal[difficulty] })
})

app.post('/post_score', (req, res) => {
    // TODO: Save score to database
    console.log(req.body)
    res.send(req.body)
  })

const scores = getScores()
app.get('/local_stats', (req, res) => {
  console.log('Scores',scores)
  req.session.bestTime = scores // hard coded for now
  //console.log('Best time',req.session.bestTime)
    req.session.lastScore = '00:00' //  hard coded for now
    req.session.last9Scores = [1,2,3,4,5,6,7,8,9]
    res.json({
        bestTime: req.session.bestTime,
        lastScore: req.session.lastScore,
        last9Scores: scores
      });
})

app.get('/posted_stats', (req, res) => {
  req.session.top10Scores = [1,2,3,4,5,6,7,8,9,10]
  res.json({
      top10Scores: req.session.top10Scores
    });
})

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})

//await client.end();