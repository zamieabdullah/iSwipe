const iswipe = require("express").Router();
const { getGames, addGame, viewGames } = require("../controllers/iSwipe");
const { verifyAuth } = require("../controllers/auth");

iswipe.get("/getGames", verifyAuth, getGames);
iswipe.post("/addGame", verifyAuth, addGame);
iswipe.get("/viewGames", verifyAuth, viewGames)

module.exports = iswipe;