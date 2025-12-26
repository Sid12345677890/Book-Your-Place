import Joi from "joi";

 export const reviewSchema=Joi.object({
    review:Joi.object({
        comment:Joi.string().min(1).max(1000).required(),
        rating:Joi.number().min(1).max(5).required()
    }).required()
});
