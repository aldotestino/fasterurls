const joi = require('joi');

const urlSchema = joi.object({
  alias: joi.string().alphanum().max(10).min(1),
  url: joi.string().uri().required()
});

module.exports = urlSchema;