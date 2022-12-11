const pool = require("../db/index");
const router = require("express").Router()

const auth = require("./auth");
const users = require("./users");
const iswipe = require("./iSwipe");

router.use("/user", users);
router.use("/auth", auth);
router.use("/iswipe", iswipe);

router.get("/hello", async(req, res) => {
    try {
        return res.status(200).json({message: "Hello"});
    } catch (e) {
        return res.status(500).json({message: "Error!"});
    }
})


module.exports = router;