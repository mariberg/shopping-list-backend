const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const authorize = require('../verifyToken');
const { validateProductSearch, validateProductId, validateProductData } = require('../middleware/validation');


router.get('/mainListProducts/product/:term', authorize, validateProductSearch, ProductController.findMatchingProduct);
router.get('/mainListProducts/:_id', authorize, validateProductId, ProductController.findProduct);

//TODO this is not yet used on frontend
router.post('/mainListProducts', validateProductData, ProductController.addProduct);


module.exports = router;