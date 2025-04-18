const mongoose = require('mongoose');
const Review = require('./review');

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        default: "default"
    },
    url: {
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1677269242094-f549ac0ebaed?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
});

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url : String,
        filename : String,
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Example: Ensure price is non-negative
    },
    location: String,
    country: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
        }
      }
});

listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
