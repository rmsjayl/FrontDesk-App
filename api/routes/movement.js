const express = require("express");
const router = express.Router();

const { getpackagemovements } = require("../controllers/movement");

router.get("/", getpackagemovements);

module.exports = router;
