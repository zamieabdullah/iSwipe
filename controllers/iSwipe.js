const axios = require('axios');
const pool = require('../db/index');
const jwt = require('jsonwebtoken');

const getGames = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        headers: {
          'X-RapidAPI-Key': '51ead2eaa0msh12523284a588b95p1edf98jsnf3b4f29cfd95',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          return res.json(response.data)
      }).catch(function (error) {
          console.error(error);
      });
}

const addGame = async (req, res) => {
    try {
      const id = req.user;
      const { game_id } = req.query;
      console.log(req)
      console.log(game_id)
      
      const record = await pool.query('INSERT INTO games (account_id, game_id) VALUES ($1, $2)', [id, game_id]);

      return res.status(200).json({'message': 'Game Recorded'})
    } catch (e) {
      console.log(e)
      return res.status(500).json({'message': 'Server did not record'})
    }
}

module.exports = { getGames, addGame }