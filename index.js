//import axios from 'axios'
const PORT = 8000
const axios = require('axios')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(cors())

app.get('/number', (req, res) => {
    //const axios = require('axios');

    const options = {
    method: 'GET',
    url: 'https://a-randomizer-data-api.p.rapidapi.com/api/random/numbers',
    params: {
        count: '1',
        min: '0',
        max: '100'
    },
    headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'a-randomizer-data-api.p.rapidapi.com'
    }
    };
    axios.request(options).then(function (response) {
        console.log(response.data);
        res.json(response.data)
    }).catch(function (error) {
        console.error(error);
    })
})

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})

