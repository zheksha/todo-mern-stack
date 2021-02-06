const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//********************/

exports.signUpNewUser = async (req, res) => {
  try {
    const body = req.body;
    //creating new mongoose doc from user model
    const newUser = new User(body);

    //generating hash salt
    const salt = await bcrypt.genSalt(10);

    //set use password to new hashed password
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await User.create(newUser);
    res.status(201).json({
      status: "success",
      data: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: "Invalid data sent" });
  }
};

//********************/

///Login contoller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      // check user password with hashed password stored in database
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 360000 },
          (error, token) => {
            if (error) throw error;
            res.status(200).json({ status: "success", token: token });
          }
        );
      } else {
        res
          .status(400)
          .json({ status: "fail", message: "wrong username or password" });
      }
    } else {
      res
        .status(400)
        .json({ status: "fail", message: "wrong username or password" });
    }
  } catch (error) {
    res.status(404).json({ status: "failed to get user", message: error });
  }
};

//********************/

// delete user

exports.deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        await User.findByIdAndDelete(user._id);
        res
          .status(200)
          .json({ status: "success", message: "user successfully deleted" });
      } else {
        res
          .status(400)
          .json({ status: "fail", message: "wrong username or password" });
      }
    } else {
      res
        .status(400)
        .json({ status: "fail", message: "wrong username or password" });
    }
  } catch (error) {
    res.status(404).json({ status: "failed to get user", message: error });
  }
};
