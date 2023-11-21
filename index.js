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

async function getLocalScores() {
  try {
    const res = await client.query("SELECT player_name,score_time,score_date FROM scores WHERE player_name = 'Player628' ORDER BY score_time asc LIMIT 5;")
    //console.log('rows',res.rows);
    const scores = res.rows.map((row) => {
      return {name: row.player_name, 
              score: row.score_time,
              date: row.score_date}
    })
    //console.log('Successfully retrieved scores', scores[0]);
    
    return scores;
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

const crypto = require('crypto');
const { get } = require('http');
const { format } = require('path');

const generateDailyTarget = (min, max) => {
  if (min >= max) {
      throw new Error('Min should be less than max.');
  }

  const randomBytes = crypto.randomBytes(4);
  const randomNumber = randomBytes.readUInt32BE(0);
  const scale = max - min + 1;

  return min + (randomNumber % scale);
}

const tiles = {
    goal : {
      easy: generateDailyTarget(4,200),
      advanced: generateDailyTarget(201,1000),
      expert: generateDailyTarget(1001,5000)},
    tiles:{
      easy: [1, 2, 3, 4, 5],
      advanced: [1, 2, 3, 4, 5, 6, 7],
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

function postScore(name, score) {    
  try {
    const query1 = `INSERT INTO scores (player_name, score_time, score_date) VALUES ('${name}', ${score}, '${new Date().toDateString()}');`;
    console.log("Here is the query",query1);
    const res = client.query(query1);
    //console.log(res.rows);
    //console.log('Successfully retrieved scores', res.rows[0].name);
    return res.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

app.post('/post_score', (req, res) => {
    // TODO: Save score to database
    console.log('post_score body:',req.body)
    postScore(req.body.username, req.body.score)
    res.send(req.body)
  })

// calculate average score
const getAverage = (scores) => {
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i].score;
  }
  return sum / scores.length;
}

// compare function for sorting scores by date
const compare = (a, b) => {
  if (a.date < b.date) {
    return -1;
  } else if (a.date > b.date) {
    return 1;
  } else {
    return 0;
  }
}

// check if daily
const isDaily = (scores) => {
  const today = new Date();
  const todayString = today.toDateString();
  if (scores[0].date === todayString) {
    return true;
  } else {
    return false;
  }
}


app.get('/local_stats', async (req, res) => {
  try {
      const scores = await getLocalScores();
      req.session.best = scores[0].score;
      req.session.average = getAverage(scores);
      req.session.daily = isDaily(scores) == true? scores.sort(compare)[0].score : 'None';
      res.json({
        best: req.session.best,
        average: req.session.average,
        daily: req.session.daily
      });
  } catch (error) {
      res.status(500).send(error.toString());
  }
});

async function getTop10Scores() {
  try {
    const res = await client.query("SELECT player_name,score_time,score_date FROM scores ORDER BY score_time asc LIMIT 10;")
    //console.log('rows',res.rows);
    const scores = res.rows.map((row) => {
      return {name: row.player_name, 
              score: row.score_time,
              date: row.score_date}
    })
    //console.log('Successfully retrieved scores', scores[0]);
    
    return scores;
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

app.get('/posted_stats', async (req, res) => {
  req.session.top10Scores = await getTop10Scores()
  res.json({
      top10Scores: req.session.top10Scores
    });
})

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
})

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})

//await client.end();