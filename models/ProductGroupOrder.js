// Schema for a subdocument.This will be embedded in Lists-schema, and a model will be created there

const mongoose = require('mongoose');



const ProductGroupOrderSchema = new mongoose.Schema({
  productGroup: {
    type: String,
    required: true,
    // Removed unique constraint as it doesn't work correctly in subdocuments
    // Uniqueness should be enforced at the application level or with compound indexes
  },
});

module.exports = ProductGroupOrderSchema;