// methods for the product database that can be accessed by all registered users

const Product = require('../models/Product');

/**
 * Standard error response handler
 * @param {Error} error - The error object
 * @param {Object} res - Express response object
 * @param {String} operation - Description of the operation that failed
 * @param {Number} statusCode - HTTP status code (default: 500)
 */
const handleError = (error, res, operation, statusCode = 500) => {
  console.error(`Error in ${operation}:`, error);
  res.status(statusCode).json({
    success: false,
    message: `Failed to ${operation}`,
    error: error.message
  });
};

const ProductController = {
  // find products that match the search term
  findMatchingProduct: (req, res) => {
    try {

      // Sanitize the search term to prevent regex injection
      const sanitizedTerm = req.params.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      Product.find(
        { "product": { $regex: '^' + sanitizedTerm, $options: "m" } }, // ^products starting with search term
        (error, products) => {
          if (error) {
            return handleError(error, res, 'find matching products');
          }

          res.status(200).json({
            success: true,
            count: products.length,
            data: products
          });
        });
    } catch (error) {
      handleError(error, res, 'find matching products');
    }
  },

  // find by id
  findProduct: (req, res) => {
    try {

      Product.find(
        { "_id": req.params._id },
        (error, products) => {
          if (error) {
            return handleError(error, res, 'find product by ID');
          }

          if (!products || products.length === 0) {
            return res.status(404).json({
              success: false,
              message: 'Product not found'
            });
          }

          res.status(200).json({
            success: true,
            data: products[0]
          });
        });
    } catch (error) {
      handleError(error, res, 'find product by ID');
    }
  },

  //? this method is not yet used at the frontend, could be used by admin users
  addProduct: function (req, res, next) {
    try {
      const { product, quantity, productGroup } = req.body;

      Product.create({
        product: product,
        quantity: quantity,
        productGroup: productGroup
      },
      (err, product) => {
        if (err) {
          // Check for duplicate key error (MongoDB code 11000)
          if (err.code === 11000) {
            return res.status(409).json({
              success: false,
              message: 'Product already exists',
              error: err.message
            });
          }
          return handleError(err, res, 'add product');
        }

        res.status(201).json({
          success: true,
          message: 'Product added successfully',
          data: product
        });
      });
    } catch (error) {
      handleError(error, res, 'add product');
    }
  }
};

module.exports = ProductController;