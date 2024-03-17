const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const otpGenerator = require('../utils/otpGenerator');
const sendMail = require('../utils/mailSender');
const authMiddleware = require('../middleware/authentication');


const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(501).send('fill all the fields');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = otpGenerator();

    const user = await User.create({ email, password: hashedPassword, otp, username });

    sendMail(otp, user.email);

    const token = jwt.sign({ userId: user._id, verified: user.verify }, process.env.JWT_SECRET);
    return res.cookie("token", token, { sameSite: 'none', secure: true }).status(201).json({ user });
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(501).send('fill all the fields');

  const user = await User.findOne({ email });
  if (!user) {
    return res.send("user not found");
  }
  const isMatched = bcrypt.compareSync(password, user.password);
  if (!isMatched) {
    return res.send("password not match");
  }
  const token = jwt.sign({ userId: user._id, verified: user.verify }, process.env.JWT_SECRET);
  return res.cookie("token", token, { sameSite: 'none', secure: true }).status(201).json({ user });
})

router.post('/verify', async (req, res) => {
  const { otp } = req.body;
  const { token } = req.cookies;
  console.log(token);
  if (!token) return res.status(501).send('not authorized');
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ _id: payload.userId });
  if (user.otp != +otp) {
    // throw new Error('Invalid OTP...');
    return res.status(400).send('Invalid OTP...');
  }
  await User.findOneAndUpdate({ _id: payload.userId }, { verify: true });
  const token1 = jwt.sign({ userId: user._id, verified: true }, process.env.JWT_SECRET);
  return res.cookie("token", token1, { sameSite: 'none', secure: true }).status(200).send('ok')
})

router.get('/profile', authMiddleware, async (req, res) => {
  console.log(req.user);
  if(!req.user) return res.status(400).send('You are not logged in');
  const { userId, verified } = req.user;
  if (!verified) return res.status(400).send('You are not verified');
  const user = await User.findOne({ _id: userId });
  res.send({ email: user.email, username: user.username });
})

module.exports = router;