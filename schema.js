const Joi = require('joi');

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(), 
        rating: Joi.number().min(1).max(5)
    }).required()
})