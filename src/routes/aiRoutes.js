const express = require("express");
const { improveNote } = require("../controllers/aiController");

const router = express.Router();

router.route("/improve-note").post(improveNote);

module.exports = router;
