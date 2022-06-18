// this model is for products that are in the database so that the user can search
// for them when adding on mainItem shopping list

const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
  product: { type: String, unique: true, required: true, max: 15, lowercase: true }, //! check if lowercase works
  quantity: { type: Number, unique: false, required: true },
  productGroup: {
    type: String,
    enum: ['Fruit and Veg', 'Bakery', 'Home baking', 'Household', 'Health and Beauty', 'Frozen', 'Meat and Fish', 'Dairy', 'Food cupboard', 'Other'],
    required: true
  },
});



const Product = mongoose.model('Product', ProductSchema);



module.exports = Product;