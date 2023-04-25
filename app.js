require('dotenv').config();
const bodyParser = require('body-parser');
// importing express
const express = require('express')
const passport = require('passport');
const session = require('express-session');
// importing routes
const userRoutes = require('./routers/user.routes');
const authRoutes = require('./routers/auth.routes');
require('./utils/passport-user');

// creating an express app 
const app = express();

app.get('/', (req, res) =>{
    res.send('Apartier API')

})

// middle ware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setting up session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));
  app.use(passport.initialize());
  app.use(passport.session());

app.use('/api', userRoutes);
app.use('/auth', authRoutes);



// exporting app
module.exports = app;