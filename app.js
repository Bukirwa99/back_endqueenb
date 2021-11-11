const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = 3000 || process.env.PORT;

mongoose.connect('mongodb+srv://admin:queenAdmin@cluster0.tep0h.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then((result) => app.listen(PORT, () => console.log(`Listening to port ${PORT}`)))
    .catch((err) => console.log(err));

// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('login'));
// app.get('/profile', (req, res) => res.render('profile'));

app.use(authRoutes);