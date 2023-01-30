const express = require('express');
const ListsController = require('../controllers/listsController');
const router = express.Router();
const authorize = require('../verifyToken');

router.post('/', ListsController.addUser); // no authorization, because this is done after registration before login

router.get('/mainListItems/:username', authorize, ListsController.findMainListItems);
router.post('/mainListItems/:username', authorize, ListsController.addMainListItem);
router.delete('/mainListItems/:username/:id', authorize, ListsController.deleteMainListItem);


router.get('/otherListItems/:username', authorize, ListsController.findOtherListItems);
router.put('/otherListItems/:username', authorize, ListsController.addOtherListItem);
router.delete('/otherListItems/:username/:id', authorize, ListsController.deleteOtherListItem);


router.get('/productGroupOrder/:username', authorize, ListsController.findProductGroupOrder);
router.put('/productGroupOrder/:username', authorize, ListsController.replaceProductGroupOrder);


module.exports = router;