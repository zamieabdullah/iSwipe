const axios = require('axios');
const pool = require('../db/index');
const jwt = require('jsonwebtoken');
const { response } = require('express');

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
      
      const record = await pool.query('INSERT INTO games (account_id, game_id) VALUES ($1, $2)', [id, game_id]);

      return res.status(200).json({'message': 'Game Recorded'})
    } catch (e) {
      return res.status(500).json({'message': 'Server did not record'})
    }
}

const viewGames = async (req, res) => {
    try {
        const id = req.user;
        const list = await pool.query('SELECT game_id FROM games WHERE account_id = $1', [id])

        arr = []
        for (let i = 0; i < list.rows.length; i++) {
            arr.push(await gameDetails(list.rows[i].game_id))
        }
        
        return res.status(200).json({list: arr})
    } catch (e) {
        return res.status(500).json({'message': 'Server error'})
    }
}

/************************* HELPER FUNCTIONS ****************************/
const gameDetails = async (game_id) => {
  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
    params: {id: game_id},
    headers: {
      'X-RapidAPI-Key': '51ead2eaa0msh12523284a588b95p1edf98jsnf3b4f29cfd95',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  let data = await axios.request(options).then(function (response) {
    return response.data;
  }).catch(function (error) {
    console.error(error);
  });
  return data
}

module.exports = { getGames, addGame , viewGames}