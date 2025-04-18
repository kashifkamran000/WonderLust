const { model } = require("mongoose");
const Listing = require('./models/listing');
const ExpressError = require('./utility/ExpressError.js');
const Review = require('./models/review.js')

module.exports.isLogedin = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        return res.redirect('/login');
        }
    next();
}

module.exports.savedRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.curUser._id)){
        req.flash("error", "You don't have permision to edit!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next)=>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curUser._id)){
        return res.redirect(`/listings/${id}`);
    }
    next();
}