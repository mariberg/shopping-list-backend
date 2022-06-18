// Lists model includes all three lists that each user can create

const mongoose = require('mongoose');

// importing other schemas so that we can create a model here
const MainListItemSchema = require('./MainListItem');
const OtherListItemSchema = require('./OtherListItem');
const ProductGroupOrderSchema = require('./ProductGroupOrder');

const ListsSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true, // username is saved in lowercase
    required: true,
  },
  mainListItems: {
    type: [MainListItemSchema],
    required: true,
  },

  otherListItems: {
    type: [OtherListItemSchema],
    required: true,
  }, // this array will determine the order how mainListItems will be displayed for the user
  productGroupOrder: {
    type: [ProductGroupOrderSchema],
    required: true,
    unique: true
  }

});

// Creating model from schema:
const Lists = mongoose.model('Lists', ListsSchema);


module.exports = Lists;