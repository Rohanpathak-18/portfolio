const express = require("express");

const Message =
require("../models/Message");

const auth =
require("../middleware/auth");

const router =
express.Router();

router.post("/", async (req, res) => {

  const message =
  await Message.create(req.body);

  res.json(message);

});

router.get("/", auth,
async (req, res) => {

  const messages =
  await Message.find();

  res.json(messages);

});

module.exports = router;