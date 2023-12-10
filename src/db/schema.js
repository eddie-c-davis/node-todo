const joi = require('joi');

const schema = joi.object({
    title: joi.string()
        .min(3)
        .max(30)
        .required(),
    description: joi.string()
        .min(3)
        .max(255)
        .required(),
    creator: joi.string()
        .min(3)
        .max(30)
        .required(),
    assignee: joi.string()
        .min(3)
        .max(30)
        .required(),
    due_date: joi.string()
        .min(3)
        .max(30)
        .required(),
});

module.exports = schema;