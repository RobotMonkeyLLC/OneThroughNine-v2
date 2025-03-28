const { Client } = require('pg');
require('dotenv').config()
//const pool = new Pool()
const client = new Client({
  user: process.env.PGUSER,
  ssl: {
    rejectUnauthorized: false
  }
})

const PORT = process.env.PORT || 8000;
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const path = require('path')
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

async function getLocalScores(name, level) {
  try {
    const res = await client.query(`SELECT player_name,score_time,score_date 
      FROM scores WHERE player_name = '${name}' AND difficulty_id = ${level}
      ORDER BY score_date DESC;`)
    
    const scores = res.rows.length > 0 ? 
      res.rows.map((row) => {
        return {name: row.player_name, 
                score: row.score_time,
                date: row.score_date}
                
      }) : [{name: name, score: 0, date: new Date()}].map((row) => {
        return {name: row.name, 
                score: 0,
                date: row.date}
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

const old_generateDailyTarget = (min, max) => {
  if (min >= max) {
      throw new Error('Min should be less than max.');
  }

  const randomBytes = crypto.randomBytes(4);
  const randomNumber = randomBytes.readUInt32BE(0);
  const scale = max - min + 1;

  return min + (randomNumber % scale);
}

async function generateDailyTarget(level) {
  try {
    //setTZ = await client.query(`SET TIME ZONE '${Intl.DateTimeFormat().resolvedOptions().timeZone}';`)
    setTZ = await client.query(`SET TIME ZONE 'EST';`)
    const res = await client.query(`SELECT ${level} FROM daily_goals WHERE date=(SELECT CURRENT_DATE);`)
    
    const target = res.rows.map((row) => {
      return {target: row[level]}
    })
    
    const res2 = await client.query('SELECT CURRENT_DATE;');
    
    return target[0].target;
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

const tiles = {
    tiles:{
      /* easy: [1, 2, 3, 4, 5],
      advanced: [1, 2, 3, 4, 5, 6, 7],
      expert: [1, 2, 3, 4, 5, 6, 7, 8, 9] */
      lvl_1: [1, 2, 3, 4, 5],
      lvl_2: [1, 2, 3, 4, 5, 6],
      lvl_3: [1, 2, 3, 4, 5, 6, 7]
    }
}
 
// merge difficulty endpoints into single call at the start of game
app.get('/tiles', async (req, res) => {
    try {
      const difficulty = req.query.difficulty;

      if (!difficulty || !tiles.tiles[difficulty]) {
          return res.status(400).json({ error: 'Invalid difficulty level provided.' });
      }
      
      goal = await generateDailyTarget(difficulty)
      
      return res.json({ tiles: tiles.tiles[difficulty],
                        target: goal })
    } catch (error) {
      res.status(500).send(error.toString()); 
    }
})

async function postScore(name, score, difficulty, date) {    
  try {
    const query1 = `INSERT INTO scores 
      (player_name, score_time, difficulty_id, score_date) 
      VALUES ('${name}', ${score}, '${difficulty}', '${date}');`;
    console.log("Here is the query",query1, "Here is the name", name, "Here is the score", score, "Here is the difficulty", difficulty);
    await client.query(query1).then((res) => {
      //console.log(res.rows);
      console.log('Successfully updated scores');
      return res.rows;} )
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}

app.post('/post_score', (req, res) => {
    // TODO: Save score to database
    console.log('post_score body:',req.body)
    postScore(req.body.name, req.body.score, req.body.difficulty, req.body.date)
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

app.get('/local_stats', async (req, res) => {
  try {
      const scores1 = await getLocalScores(req.query.name, 1);
      const scores2 = await getLocalScores(req.query.name, 2);
      const scores3 = await getLocalScores(req.query.name, 3);
      
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const d = new Date().toDateString();
      
      req.session.best1 = scores1.sort((x, y) => x.score - y.score )[0].score;
      req.session.average1 = getAverage(scores1);
      req.session.daily1 =  scores1[0].date.toDateString() == d ? scores1[0].score: 0;      
      
      req.session.best2 = scores2.sort((x, y) => x.score - y.score )[0].score;
      req.session.average2 = getAverage(scores2);
      req.session.daily2 =  scores2[0].date.toDateString() == d ? scores2[0].score: 0;
      
      req.session.best3 = scores3.sort((x, y) => x.score - y.score )[0].score;
      req.session.average3 = getAverage(scores3);
      req.session.daily3 =  scores3[0].date.toDateString() == d ? scores3[0].score: 0;
      
      //req.session.top10Scores = await getTop10Scores()
      res.json({
        lvl1: {best: req.session.best1,
          average: req.session.average1,
          daily: req.session.daily1},
        lvl2: {best: req.session.best2,
          average: req.session.average2,
          daily: req.session.daily2},
        lvl3: {best: req.session.best3,
          average: req.session.average3,
          daily: req.session.daily3}
      });
      
  } catch (error) {
      res.status(500).send(error.toString());
  }
});

async function getTop10Scores(level) {
  try {
    const res = await client.query(`SELECT player_name,score_time,difficulty_id,score_date FROM scores WHERE difficulty_id = ${level} ORDER BY score_time asc LIMIT 10;`)
    //console.log('rows',res.rows);
    const scores = res.rows.map((row) => {
      return {name: row.player_name, 
              score: row.score_time,
              difficulty: row.difficulty_id,
              date: row.score_date}
    })
    //console.log('Successfully retrieved scores', scores[0]);
    
    return scores;
  } catch (err) {
    console.error('Error executing query', err.stack);
  }
}


app.get('/posted_stats', async (req, res) => {
  req.session.top10Scores = await getTop10Scores(1)
  req.session.top10Scores2 = await getTop10Scores(2)
  req.session.top10Scores3 = await getTop10Scores(3)
  res.json({
      top10Scores: req.session.top10Scores,
      top10Scores2: req.session.top10Scores2,
      top10Scores3: req.session.top10Scores3
    });
})

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
})

const buildPath = path.join(__dirname, 'client/build');
app.use('/',express.static(buildPath));
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname + "client/build/index.html"),
    function(err){
      res.status(500).send(err)
    }
  )
})

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})

//await client.end();