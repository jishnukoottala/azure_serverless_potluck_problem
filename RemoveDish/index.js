const cosmos = require("@azure/cosmos");
const CosmosClient = cosmos.CosmosClient;
const client = new CosmosClient(process.env.potluckgamedb_DOCUMENTDB);

async function deleteDish(context, id) {
  const querySpec = {
    query: "SELECT VALUE r.friend FROM root r WHERE r.id = @id",
    parameters: [
      {
        name: "@id",
        value: id,
      },
    ],
  };
  const { resources: results } = await client
    .database("potluckdb")
    .container("MyCollection")
    .items.query(querySpec)
    .fetchAll();
  if (results.length > 0) {
    var friendName = results[0]; // assuming the first to be deleted
    await client
      .database("potluckdb")
      .container("MyCollection")
      .item(id, friendName)
      .delete();
    context.log(`Deleted item:\n${id}\n`);
  }
}

module.exports = async function(context, req) {
  if (req.params && req.params.id) {
    await deleteDish(context, req.params.id);

    context.res = {
      status: 200,
      body: "Item successfully deleted",
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass a dish id",
    };
  }
};
