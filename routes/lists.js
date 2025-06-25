const express = require('express');
const ListsController = require('../controllers/listsController');
const router = express.Router();
const authorize = require('../verifyToken');
const { validateUsername, validateListItemData, validateItemId, validateProductGroupOrder } = require('../middleware/validation');

router.post('/', ListsController.addUser); // no authorization, because this is done after registration before login

router.get('/mainListItems/:username', authorize, validateUsername, ListsController.findMainListItems);
router.post('/mainListItems/:username', authorize, validateUsername, validateListItemData, ListsController.addMainListItem);
router.delete('/mainListItems/:username/:id', authorize, validateUsername, validateItemId, ListsController.deleteMainListItem);


router.get('/otherListItems/:username', authorize, validateUsername, ListsController.findOtherListItems);
router.put('/otherListItems/:username', authorize, validateUsername, validateListItemData, ListsController.addOtherListItem);
router.delete('/otherListItems/:username/:id', authorize, validateUsername, validateItemId, ListsController.deleteOtherListItem);


router.get('/productGroupOrder/:username', authorize, validateUsername, ListsController.findProductGroupOrder);
router.put('/productGroupOrder/:username', authorize, validateUsername, validateProductGroupOrder, ListsController.replaceProductGroupOrder);


module.exports = router;