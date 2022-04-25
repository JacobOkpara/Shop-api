const User = require("../models/user.model");
const { loginSchema, registerSchema } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { value, error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error.message);
  }

  let user = await User.findOne({ email: value.email });
  if (user) {
    return res.status(409).json({ msg: "Email alredy in use." });
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);

  user = await User.create({
    username: value.username,
    email: value.email,
    password: hashedPassword,
  });

  res.status(201).json(user);
};

const login = async (req, res) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  let user = await User.findOne({ email: value.email });

  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(value.password, user.password);

  if (!isMatch) {
    return res.status(400).json({ msg: " Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "secret",
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json(token);
};

module.exports = {
  register,
  login,
};
