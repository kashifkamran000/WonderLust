const { model } = require('mongoose');
const Listing = require('../models/listing');
const Review = require('../models/review');

const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocode({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    try {
        const allListing = await Listing.find();
        res.render('listings/index.ejs', { allListing });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching listings");
    }
};

module.exports.newListing = (req, res) => {
    res.render('listings/new');
};

module.exports.showListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id).populate({ path: 'reviews', populate: { path: 'author' } }).populate("owner");
        res.render('listings/show.ejs', { listing });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the listing");
    }
};

module.exports.createListing = async (req, res) => {
    try {
        const response = await geocodingClient.forwardGeocode({
            query: req.body.location,
            limit: 1
          })
            .send();
        let geometry = response.body.features[0].geometry;
    
       const { title, price, location, country, description } = req.body;
        let image = {
            url: req.file ? req.file.path : "https://images.unsplash.com/photo-1499002238440-d264edd596ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            filename: req.file ? req.file.filename : "default"
        };
        
        const newListing = new Listing({
            title,
            price,
            location,
            country,
            description,
            image,
            owner: req.user._id, 
        });

        newListing.geometry = geometry;

        let saved = await newListing.save();
        console.log(saved);
        res.redirect('/listings');
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while creating the listing");
    }
};

module.exports.editListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        res.render('listings/edit.ejs', { listing });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching the listing for editing");
    }
};

module.exports.updateListing = async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;
        const { id } = req.params;
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        if(typeof req.file !== "undefined"){
        listing.image = {url, filename};
        await listing.save();
        }
        res.redirect('/listings');
    } catch (error) {
        next(error);
    }
};

module.exports.deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect('/listings');
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while deleting the listing");
    }
};
