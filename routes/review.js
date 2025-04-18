const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utility/wrapAsync.js');
const Review = require('../models/review.js');
const { reviewSchema } = require('../schema.js');
const Listing = require('../models/listing.js');
const ExpressError = require('../utility/ExpressError.js');
const { isLogedin, isReviewAuthor } = require('../middelware.js');
const reviewController = require('../controllers/review.js');

// Validation middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(el => el.message).join(','));
    } else {
        next();
    }
};

// Review post route
router.post('/',isLogedin, validateReview, wrapAsync(reviewController.reviewPost));

// Delete review route
router.delete('/:reviewId',isLogedin, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;
