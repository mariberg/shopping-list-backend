// Schema for a subdocument.This will be embedded in Lists-schema, and a model will be created there
const mongoose = require('mongoose');


const MainListItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
    unique: false,
    lowercase: true
  },
  quantity: { type: Number, required: false },
  productGroup: {
    type: String,
    required: true,
  }
});


// exporting schema
module.exports = MainListItemSchema;
