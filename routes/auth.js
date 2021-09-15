const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //  setting 10-digit limit on a hashed password
    const salt = await bcrypt.genSalt(10);
    //  hashing the password user typed in
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //creating new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,

      //  saving hashed user's password into db instead of user's password
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();

    //  sending a response in json
    res.status(200).json(user);

  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //  find a user by his/her email
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    //  "req.body.user" is a password user has typed in
    //  "user.password" is a password that was saved into db during registration
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
