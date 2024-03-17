require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');

const app = express();
// app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}))


app.use('/',userRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/verify').then(()=>console.log('connected'));
app.listen(4000, () => console.log('working..'));