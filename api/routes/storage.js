const express = require("express");
const router = express.Router();

const {
  getstorage,
  checkstorage,
  addstorage,
} = require("../controllers/storage");

router.get("/", getstorage);
router.get("/:id", checkstorage);
router.post("/", addstorage);

module.exports = router;
