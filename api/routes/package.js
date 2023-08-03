const express = require("express");
const router = express.Router();

const {
  getpackage,
  getpackageid,
  createpackage,
  retrievepackage,
} = require("../controllers/package");

router.get("/", getpackage);
router.get("/:id", getpackageid);
router.post("/", createpackage);
router.post("/:id", retrievepackage);

module.exports = router;
