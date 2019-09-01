const router = require("express").Router();
const words = require("./words");

// Book routes
router.use("/words", words);

module.exports = router;
