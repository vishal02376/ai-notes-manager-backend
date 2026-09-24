const express = require("express");
const { improveNote } = require("../controllers/aiController");

const router = express.Router();


router.post("/improve-note", improveNote);

module.exports = router;
