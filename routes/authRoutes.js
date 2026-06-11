const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const router = express.Router();

router.post("/register", async (req, res) => {

  try {

    const { username, password } = req.body;

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin =
      await Admin.create({
        username,
        password: hashedPassword
      });

    res.json(admin);

  } catch (error) {

    res.status(500).json(error);

  }

});

router.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    const admin =
      await Admin.findOne({ username });

    if (!admin) {

      return res.status(400).json({
        message: "Admin not found"
      });

    }

    const match =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!match) {

      return res.status(400).json({
        message: "Wrong password"
      });

    }

    const token = jwt.sign(
      {
        id: admin._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      token
    });

  } catch (error) {

    res.status(500).json(error);

  }

});

module.exports = router;