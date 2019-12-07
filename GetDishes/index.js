module.exports = async function(context, req) {
  context.log("About to get dishes ... ");

  const dishes = context.bindings.dishes;
  const results = [];

  dishes.forEach(dishItem => {
    let dish = {};
    dish.id = dishItem.id;
    dish.name = dishItem.name;
    dish.friend = dishItem.friend;

    results.push(dish);
  });
  context.res.set('content-type','application/json')
  context.res = {
    body: results,
  };
};
