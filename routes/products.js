const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const authorize = require('../verifyToken');


router.get('/mainListProducts/product/:term', authorize, ProductController.findMatchingProduct);
router.get('/mainListProducts/:_id', authorize, ProductController.findProduct);

//TODO this is not yet used on frontend
router.post('/mainListProducts', ProductController.addProduct);


module.exports = router;