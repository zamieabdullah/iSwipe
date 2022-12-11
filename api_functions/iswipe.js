const iswipe = require("express").Router();
const { getGames, addGame } = require("../controllers/iSwipe");
const { verifyAuth } = require("../controllers/auth");

iswipe.get("/getGames", verifyAuth, getGames);
iswipe.post("/addGame", verifyAuth, addGame);

module.exports = iswipe;