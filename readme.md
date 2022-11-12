# Shopping List Backend

This REST API has been build with Nodejs, Express and Mongoose.

## General Info

This app is part of my fullstack project for Web Developer Study Module at JAMK University of Applied Sciences. The frontend Angular app can be found in this repository: https://github.com/mariberg/shopping-list.git.

The idea of the app is that a registered user is able to create two separate shopping lists - one for his main supermarket and the other for other shops. The list for main supermarket can be organized in the order that the user usually does their shopping. That means each product has a product group linked to it (for example dairy, fruit and veg etc.) The user is able to choose the order for their product groups and the items on the shopping list will be displayed according to this order.

## Libraries that were used in this project

- bcryptjs
- jwttoken
- cors

## Development server

Run npm start for a dev server. Navigate to http://localhost:3000/. You need to have a locally run Mongoose database connected to this app.
