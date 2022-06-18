// Schema for a subdocument.This will be embedded in Lists-schema, and a model will be created there

const mongoose = require('mongoose');

const OtherListItemSchema = new mongoose.Schema({
  product: {
    type: String,
    lowercase: true,
    required: true
  },
  comment: { type: String, required: false, max: 45 },
});


module.exports = OtherListItemSchema;