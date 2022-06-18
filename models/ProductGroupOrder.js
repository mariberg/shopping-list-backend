// Schema for a subdocument.This will be embedded in Lists-schema, and a model will be created there

const mongoose = require('mongoose');



const ProductGroupOrderSchema = new mongoose.Schema({
  productGroup: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = ProductGroupOrderSchema;