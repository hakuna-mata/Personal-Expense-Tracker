const Joi = require("joi")

module.exports.expenseSchema = Joi.object({
    date:Joi.date(),
    amount:Joi.number().min(1).required(),
    category:Joi.string().required(),
    description:Joi.string().required()
})