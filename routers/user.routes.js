require ('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../utils/multer');
require('../utils/passport-user');
const {isAuth, isAdmin, isAuthGoogle} = require('../utils/rbac');

// importing controller
const { createShortlet, getAllShortlet,  getShortletByState, getTotalShortlet } = require('../controllers/shortlet.controller');
const { bookShortlet, verifyPayment } = require('../controllers/booking.controller');

// shortlet routes
router.post('/create', isAuthGoogle,upload.fields([{ name: 'img1' }, { name: 'img2' }]), createShortlet);
router.get('/shortlet/:page/:limit',  isAuthGoogle, getAllShortlet);
router.get('/shortlet/:state', isAuthGoogle, getShortletByState);
router.get('/total', isAuthGoogle, getTotalShortlet);

// booking routes
router.post('/book/:shortlet_id', isAuthGoogle, bookShortlet)
router.get('/verify/:reference', isAuthGoogle, verifyPayment)










// exporting router
module.exports = router;