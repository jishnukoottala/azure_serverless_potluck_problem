module.exports = async function(context, req) {
  context.log("Changing the dish name ... ");
  console.log("req body ", req.body);
  console.log("req body name ", req.body.name);
  console.log("req param id  ", req.params.id);
  console.log("rq object is ", req);
  if (req.body && req.body.name && req.params.id) {
    const { name, friend } = req.body;
    let dish = { name, friend };
    dish.id = req.params.id;
    context.bindings.dishDocument = JSON.stringify(dish);

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: dish,
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass an id on parameter and  ( name and friend in body) ",
    };
  }
};
