// all methods that manipulate the lists can be found here

const Lists = require('../models/Lists');


const ListsController = {


  // creating a document for a new user that has just registered
  addUser: (req, res) => {


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
        throw error;
      }
      else {

      }
      console.log('User added');
      res.json(result);
    });
  },

  // methods for mainListItems ******************************
  findMainListItems: (req, res) => {
    Lists.findOne({ username: req.params.username }, (error, Lists) => {

      // the new list will be displayed according to user preferences on the settings component
      const productGroupOrder = Lists.productGroupOrder;
      const arrangedList = [];
      const mainListItems = Lists.mainListItems;


      // looping through productGroupOrder array, starting from index 0
      for (i = 0; i < (productGroupOrder.length); i++) {

        mainListItems.forEach(element => {
          // adding elements to array if they have the same productGroupOrder as the one we are currently
          // comparing two, starting from productGroupOrder[0]
          if (element.productGroup === productGroupOrder[i].productGroup) {
            arrangedList.push(element);
          } else {
            return;
          }
        }
        );
      }

      if (error) {
        throw error;
      }

      res.json(arrangedList); // returning the arranged list to client
    });
  },

  addMainListItem: (req, res) => {
    Lists.findOneAndUpdate(
      { username: req.params.username },
      { $push: { mainListItems: req.body } },
      (error, result) => {
        if (error) {
          throw error;
        }
        res.json(result);
      })
  },



  deleteMainListItem: (req, res) => {
    Lists.findOneAndUpdate(
      { username: req.params.username },
      {
        $pull: { mainListItems: { _id: req.params.id } }
      },
      (error, result) => {
        if (error) {
          throw error;
        }

        res.json(result);
      });;
  },


  // methods for otherListItems ******************************

  findOtherListItems: (req, res) => {
    Lists.findOne({ username: req.params.username }, (error, Lists) => {
      if (error) {
        throw error;
      }
      res.json(Lists.otherListItems);
    });
  },

  addOtherListItem: (req, res) => {
    Lists.findOneAndUpdate(
      { username: req.params.username },
      //{ upsert: true },
      { $push: { otherListItems: req.body } },
      { upsert: true },
      (error, result) => {
        if (error) {
          throw error;
        }
        res.json(result);
      })
  },

  // deleting item based on id
  deleteOtherListItem: (req, res) => {
    Lists.findOneAndUpdate(
      { username: req.params.username },
      {
        $pull: { otherListItems: { _id: req.params.id } }
      },
      (error, result) => {
        if (error) {
          throw error;
        }
        res.json(result);
      });;
  },


  // methods for productGroupOrder ******************************

  findProductGroupOrder: (req, res) => {
    Lists.findOne({ username: req.params.username }, (error, Lists) => {
      if (error) {
        throw error;
      }
      res.json(Lists.productGroupOrder);
    });
  },

  // the whole productGroupOrder array will be replaced according to what the user
  // has selected in frontend settings component
  replaceProductGroupOrder: (req, res) => {
    Lists.findOneAndUpdate(
      {
        username: req.params.username,
      },
      {
        $set:
          { productGroupOrder: req.body }
      },
      (error, result) => {
        if (error) {
          throw error;
        }
        res.json(result);
      });;
  },

};


module.exports = ListsController;