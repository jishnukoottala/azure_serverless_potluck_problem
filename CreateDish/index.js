const uuid = require("uuid/v1");

module.exports = async function(context, req) {
  context.log("Creating a Dish");

  if (req.body && req.body.name && req.body.friend) {
    const { name, friend } = req.body;
    let dish = { name, friend };
    dish.id = uuid();
    console.log("dish is ", name);
    context.bindings.dishDocument = JSON.stringify(dish);
    context.res = {
      body: dish,
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass name and friend",
    };
  }
};
