// all methods that manipulate the lists can be found here

const Lists = require('../models/Lists');

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

const ListsController = {


  // creating a document for a new user that has just registered
  addUser: (req, res) => {
    try {

      const NewUser = Lists(req.body);

      // a new user will get a productGroupOrder as a default, they can change in the
      // settings if they like
      const defaultList = [
        { productGroup: "Fruit and Veg" },
        { productGroup: "Bakery" },
        { productGroup: "Home baking" },
        { productGroup: "Household" },
        { productGroup: "Health and Beauty" },
        { productGroup: "Frozen" },
        { productGroup: "Meat and Fish" },
        { productGroup: "Dairy" },
        { productGroup: "Food cupboard" },
        { productGroup: "Other" }
      ];
      NewUser.productGroupOrder = defaultList;

      NewUser.save((error, result) => {
        if (error) {
          // Check for duplicate key error (MongoDB code 11000)
          if (error.code === 11000) {
            return res.status(409).json({
              success: false,
              message: 'User already exists',
              error: error.message
            });
          }
          return handleError(error, res, 'add user');
        }

        console.log('User added');
        res.status(201).json({
          success: true,
          message: 'User added successfully',
          data: result
        });
      });
    } catch (error) {
      handleError(error, res, 'add user');
    }
  },

  // methods for mainListItems ******************************
  findMainListItems: (req, res) => {
    try {

      Lists.findOne({ username: req.params.username }, (error, lists) => {
        if (error) {
          return handleError(error, res, 'find main list items');
        }

        if (!lists) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }

        try {
          // the new list will be displayed according to user preferences on the settings component
          const productGroupOrder = lists.productGroupOrder;
          const arrangedList = [];
          const mainListItems = lists.mainListItems;

          // looping through productGroupOrder array, starting from index 0
          for (let i = 0; i < (productGroupOrder.length); i++) {
            mainListItems.forEach(element => {
              // adding elements to array if they have the same productGroupOrder as the one we are currently
              // comparing two, starting from productGroupOrder[0]
              if (element.productGroup === productGroupOrder[i].productGroup) {
                arrangedList.push(element);
              }
            });
          }

          res.status(200).json({
            success: true,
            data: arrangedList
          }); // returning the arranged list to client
        } catch (err) {
          handleError(err, res, 'process main list items');
        }
      });
    } catch (error) {
      handleError(error, res, 'find main list items');
    }
  },

  addMainListItem: (req, res) => {
    try {

      Lists.findOneAndUpdate(
        { username: req.params.username },
        { $push: { mainListItems: req.body } },
        { new: true }, // Return the updated document
        (error, result) => {
          if (error) {
            return handleError(error, res, 'add main list item');
          }

          if (!result) {
            return res.status(404).json({
              success: false,
              message: 'User not found'
            });
          }

          res.status(200).json({
            success: true,
            message: 'Item added successfully',
            data: result
          });
        })
    } catch (error) {
      handleError(error, res, 'add main list item');
    }
  },



  deleteMainListItem: (req, res) => {
    try {

      Lists.findOneAndUpdate(
        { username: req.params.username },
        {
          $pull: { mainListItems: { _id: req.params.id } }
        },
        { new: true }, // Return the updated document
        (error, result) => {
          if (error) {
            return handleError(error, res, 'delete main list item');
          }

          if (!result) {
            return res.status(404).json({
              success: false,
              message: 'User not found'
            });
          }

          res.status(200).json({
            success: true,
            message: 'Item deleted successfully',
            data: result
          });
        });
    } catch (error) {
      handleError(error, res, 'delete main list item');
    }
  },


  // methods for otherListItems ******************************

  findOtherListItems: (req, res) => {
    try {

      Lists.findOne({ username: req.params.username }, (error, lists) => {
        if (error) {
          return handleError(error, res, 'find other list items');
        }

        if (!lists) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }

        res.status(200).json({
          success: true,
          data: lists.otherListItems
        });
      });
    } catch (error) {
      handleError(error, res, 'find other list items');
    }
  },

  addOtherListItem: (req, res) => {
    try {

      Lists.findOneAndUpdate(
        { username: req.params.username },
        { $push: { otherListItems: req.body } },
        { upsert: true, new: true }, // Create if doesn't exist and return updated document
        (error, result) => {
          if (error) {
            return handleError(error, res, 'add other list item');
          }

          res.status(200).json({
            success: true,
            message: 'Item added successfully',
            data: result
          });
        });
    } catch (error) {
      handleError(error, res, 'add other list item');
    }
  },

  // deleting item based on id
  deleteOtherListItem: (req, res) => {
    try {

      Lists.findOneAndUpdate(
        { username: req.params.username },
        {
          $pull: { otherListItems: { _id: req.params.id } }
        },
        { new: true }, // Return the updated document
        (error, result) => {
          if (error) {
            return handleError(error, res, 'delete other list item');
          }

          if (!result) {
            return res.status(404).json({
              success: false,
              message: 'User not found'
            });
          }

          res.status(200).json({
            success: true,
            message: 'Item deleted successfully',
            data: result
          });
        });
    } catch (error) {
      handleError(error, res, 'delete other list item');
    }
  },


  // methods for productGroupOrder ******************************

  findProductGroupOrder: (req, res) => {
    try {

      Lists.findOne({ username: req.params.username }, (error, lists) => {
        if (error) {
          return handleError(error, res, 'find product group order');
        }

        if (!lists) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }

        res.status(200).json({
          success: true,
          data: lists.productGroupOrder
        });
      });
    } catch (error) {
      handleError(error, res, 'find product group order');
    }
  },

  // the whole productGroupOrder array will be replaced according to what the user
  // has selected in frontend settings component
  replaceProductGroupOrder: (req, res) => {
    try {

      Lists.findOneAndUpdate(
        {
          username: req.params.username,
        },
        {
          $set: { productGroupOrder: req.body }
        },
        { new: true }, // Return the updated document
        (error, result) => {
          if (error) {
            return handleError(error, res, 'replace product group order');
          }

          if (!result) {
            return res.status(404).json({
              success: false,
              message: 'User not found'
            });
          }

          res.status(200).json({
            success: true,
            message: 'Product group order updated successfully',
            data: result
          });
        });
    } catch (error) {
      handleError(error, res, 'replace product group order');
    }
  },

};


module.exports = ListsController;