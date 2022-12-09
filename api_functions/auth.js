const auth = require("express").Router();
const { createUser, loginUser, checkUser } = require("../controllers/users");
const { verifyAuth } = require("../controllers/auth");

auth.post("/createUser", createUser); 
auth.post("/loginUser", loginUser);
auth.get("/checkUser", verifyAuth, checkUser);

module.exports = auth;