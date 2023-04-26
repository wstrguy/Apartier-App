require ('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
require ('../utils/passport-user');



// Google OAuth login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/redirect', passport.authenticate('google') , function
    (req, res) {
        // console.log(req.user);

        res.send(`Welcome ${req.user.username}!,
        <br>
        Email: ${req.user.email},
        <br>
        GoogleId: ${req.user.google_id},
        token: ${req.user.token}`,
        )
    }
);



// export router
module.exports = router;