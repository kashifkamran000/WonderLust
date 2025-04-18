if(process.env.NODE_ENV != "production"){
require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });
const listingController = require('../controllers/listing.js');
const {isLogedin, isOwner} = require('../middelware.js');
const wrapAsync = require('../utility/wrapAsync.js');
const ExpressError = require('../utility/ExpressError.js');
const Listing = require('../models/listing.js');
const passport = require('passport');


router.route('/')
//Index Page
.get(wrapAsync(listingController.index))
//Create Route
.post(isLogedin, upload.single('listing[image]'), wrapAsync(listingController.createListing));

//New Listing Route
router.get('/new', isLogedin, listingController.newListing)

//Show Page
router.get('/:id', wrapAsync(listingController.showListing))

//Edit Route
router.get('/:id/edit', isLogedin , isOwner, wrapAsync(listingController.editListing));

router.route('/:id')
//Update Route
.put(isLogedin, isOwner, upload.single('listing[image]'), wrapAsync(listingController.updateListing))
//Delete Route
.delete(isLogedin, isOwner, wrapAsync(listingController.deleteListing));


module.exports = router;