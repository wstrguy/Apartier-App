
const passport = require('passport');
require('../utils/passport-user');
const jwt = require('jsonwebtoken');


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

   
    

exports.isAdmin=(req, res, next) => {
        if (req.user && req.user.role === 'admin') {
          next(); // user is admin, continue to next middleware
        } else {
          res.status(403).send('Access denied.'); // user is not admin, return 403 Forbidden
        }
      };