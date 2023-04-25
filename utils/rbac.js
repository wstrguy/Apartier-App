
const passport = require('passport');
require('../utils/passport-user');
const jwt = require('jsonwebtoken');

// exports.isAuth = (req, res, next) => {
//   // if user is saved in session, continue to next middleware
//   if (req.session && req.session.user) {
//     next();
//   } else {
//     res.redirect('api/shortlet/1/10'); // redirect to login page
//   }
// };

// exports.isAuth = (req, res, next) => {
  
//   // if user is saved in session, continue to next middleware
//   if (req.user) {
//     next();
//   } else {
//     // res.status(403).send('Access denied.'); // user is not logged in, return 403 Forbidden
//     res.redirect("/auth/google");
//   }
// };

exports.isAuthGoogle = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // get the token from the header
  if (!token)
    return res.status(401).json({
      message: "Access denied",
    });

  // verify and decode the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded)
    return res.status(401).json({
      message: "Invalid token",
    });
    
  // if decoded returns true === create a new obj called user wrapped in the decoded obj
  req.user = decoded;

    // if user is saved in session, continue to next middleware
    if (req.isAuthenticated() || req.user) {
        return next();
    } else {
        // res.status(403).send('Access denied.'); // user is not logged in, return 403 Forbidden
        res.redirect("/auth/google");
    }

   
    // // if user is not saved in session, redirect to login page
    // res.redirect("/auth/google");
    // if user is not saved in session, verify user using Passport session


  // passport.authenticate('google', { session: true }, (err, user, info) => {
  //   if (err) {
  //     console.error(err);
  //     return next(err);
  //   }
  //   if (!user) {
  //     // if user is not authenticated, redirect to login page
  //     return res.redirect("/auth/google");
  //   }
  //   // if user is authenticated, save user to session and continue to next middleware
  //   req.login(user, (err) => {
  //     if (err) {
  //       console.error(err);
  //       return next(err);
  //     }
  //     return next();
  //   });
  // })(req, res, next);
  };

    // res.redirect("/api/google/callback");
    // };


exports.isAdmin=(req, res, next) => {
        if (req.user && req.user.role === 'admin') {
          next(); // user is admin, continue to next middleware
        } else {
          res.status(403).send('Access denied.'); // user is not admin, return 403 Forbidden
        }
      };