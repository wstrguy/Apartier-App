const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../database/db');
// const axios = require('axios');

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
passport.deserializeUser(async (id, done) => {
    try {
      const [rows, fields] = await pool.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      const user = rows[0];
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://apartier.herokuapp.com/auth/google/redirect",
      },
      async (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        // console.log(accessToken);
        // console.log(
        //   { google_id: profile.id },
        //   { username: profile.name.givenName },
        // );
        // console.log(accessToken);
        try {


          const [rows] = await pool.query(
            'SELECT * FROM users WHERE google_id = ?',
            [profile.id]
          );
         
          if (rows.length > 0) {
            // User already exists in the database
            const currentUser = rows[0];

            const token = jwt.sign(currentUser, process.env.JWT_SECRET, {expiresIn: '1h'}, )
            console.log(`user is: ${currentUser.username}`);
            console.log(token);
            done(null, currentUser, token);

         
          } else {
            const [result] = await pool.query(
              'INSERT INTO users (google_id, username, email) VALUES (?, ?, ?)',
              [profile.id, profile.name.givenName, profile.emails[0].value]
            );
            const user = {
              id: result.insertId,
              google_id: profile.id,
              username: profile.name.givenName,
              email: profile.emails[0].value,
            };
            const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'}, )
            console.log(`new user created with Id: ${user.google_id}`);
            console.log(token);
            done(null, user, token);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
  