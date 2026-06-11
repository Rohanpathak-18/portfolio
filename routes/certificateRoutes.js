const express = require("express");

const Certificate =
require("../models/Certificate");

const auth =
require("../middleware/auth");

const router =
express.Router();

router.get("/",
async(req,res)=>{

const certificates =
await Certificate.find();

res.json(certificates);

});

router.post("/",
auth,
async(req,res)=>{

const certificate =
await Certificate.create(
req.body
);

res.json(certificate);

});

module.exports =
router;