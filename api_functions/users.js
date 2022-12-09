const users = require("express").Router();
const { getUser } = require("../controllers/users");
const { verifyAuth } = require("../controllers/auth");
 
users.get("/getUser", verifyAuth, getUser);

module.exports = users;