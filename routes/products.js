const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const authorize = require('../verifyToken');


// we don't need authorization here as transactions relate to general product database - ei kai tata edes tarvita? 
//router.get('/mainListProducts', authorize, ProductController.findProducts);

//! tassa reitissa taytyy olla joku vika, koska tulee aina virhe 404, vaikka vaihtaisi toimivaan funktioon:
//router.get('/mainListProducts/?product=:term', authorize, ProductController.findMatchingProduct);
//! taman reitin kautta paasee funktioon:
router.get('/mainListProducts/product/:term', authorize, ProductController.findMatchingProduct);
router.get('/mainListProducts/:_id', authorize, ProductController.findProduct);

//TODO this is not yet used on frontend
router.post('/mainListProducts', ProductController.addProduct);


module.exports = router;