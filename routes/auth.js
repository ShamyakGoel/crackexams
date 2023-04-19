const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser")
const JWT_SECRET = "2024da5205424fcd96b9df6e13a6221fxj7hs7JSHAKI8kJDSUD9k";

// Route 1: Create a user using: POST "/api/auth/createuser". No login required
router.post(
    "/createuser",
    [
      body("email").isEmail(),
      body("name").isLength({ min: 3 }),
      body("password").isLength({ min: 5 }),
      body('phone').isLength({min:10, max:10})
    ],
    async (req, res) => {
      res.set('Access-Control-Allow-Headers', '*')
      const errors = validationResult(req);
      const error = [];
      const err = errors.array();
      if (!errors.isEmpty()) {
        // If there are errors
        for (i in errors.array()) {
          if (err[i].param == "name") {
            error.push("Name should be more or equal than 3 characters long.");
          } else if (err[i].param == "email") {
            error.push("Email should be valid.");
          } else if (err[i].param == "password") {
            error.push(
              "Password should be more or equal than 5 characters long."
            );
          } else if (err[i].param == "phone") {
            error.push(
              "Phone is invalid"
            );
          }
        }
        return res.status(406).json({error});
      }
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        res.status(406).json({
          error: {
            code: 406,
            msg: "User already exists",
          },
        });
      } else {
        try {
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt);
          user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            phone:req.body.phone
          });
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, JWT_SECRET);
          return res.json({ authToken , user});
        } catch (e) {
          return res
            .status(500)
            .json({
              error: {
                msg: "Internal Server Error. Sorry for inconvinence",
                err: e.message,
              },
            });
        }
      }
    }
  );


  // Route 2: Authenticate user: POST "/api/auth/login". No login required

router.post(
    "/login",
    [body("email").isEmail(), body("password").exists()],
    async (req, res) => {
      res.header('Access-Control-Allow-Headers', '*')
      const errors = validationResult(req);
      const error = [];
      const err = errors.array();
      if (!errors.isEmpty()) {
        // If there are errors
        for (i in errors.array()) {
          if (err[i].param == "email") {
            error.push("Email should be valid.");
          } else if (err[i].param == "password") {
            error.push("Password could not be blank.");
          }
        }
        return res.status(406).json({error: error });
      }
      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
          return res
            .status(400)
            .json({ error: "Please try to login with correct credentials" });
        }
        const data = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({ authToken });
      } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

  // Route 3: Get loggedin user details: POST "/api/auth/getuser". Login required
router.post("/getuser",fetchUser, async (req, res) => {
  res.set('Access-Control-Allow-Headers', 'Content-type')
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
  module.exports = router