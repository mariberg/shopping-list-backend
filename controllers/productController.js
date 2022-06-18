// methods for the product database that can be accessed by all registered users

const Product = require('../models/Product');

const ProductController = {


  // find products that match the search term
  findMatchingProduct: (req, res) => {
    Product.find(
      { "product": { $regex: '^' + req.params.term, $options: "m" } }, // ^products starting with search term
      (error, products) => {
        if (error) {
          throw error;
        }
        res.json(products);
      })
  },



  // find by id
  findProduct: (req, res) => {
    Product.find(
      { "_id": req.params._id },
      (error, products) => {
        if (error) {
          throw error;
        }
        console.log(products[0]);
        res.json(products[0]);
      })
  },


  //? this method is not yet used at the frontend, could be used by admin users
  addProduct: function (req, res, next) {
    Product.create({
      product: req.body.product,
      quantity: req.body.quantity,
      productGroup: req.body.productGroup
    },
      (err, user) => {
        if (err) {
          return res.status(500).send('Error in adding product.');
        } else {
          res.json({
            success: true,
            message: 'Product added!',
          });
        }
      });
  },

}

module.exports = ProductController;