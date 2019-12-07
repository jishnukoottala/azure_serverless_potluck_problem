## The Potluck Problem

link [here](https://25daysofserverless.com/calendar/4)

### Solution

Creating REST API endpoints using Azure Functions

#### Language : Javascript

### Prerequisites

- Azure Functions for vscode
- Azure Account
- Azure Account and Sign-In vscode extension

### Create a Azure Cosmos DB

- Go to Azure Portal
- Create cosmos db account
- with core sql api selected
- in any preferred region

### Create an Azure function in vscode

Steps -

- press F1
- select Azure Functions : Create New Project
- give a name

- In Azure portal create an azure cosmos db account in a resource group - select SQL Core, because function app bindings only support SQL Core, but it is still a document db
- Now that db is setup, we need to bind it to function app
- we can create a project, by pressing F1 - Create a new project, in the same local folder,
- create 4 projects in total for each endpoint
- in this case it is "GetDishes", "CreateDish", "ChangeDish" and "RemoveDish"
-
- create a binding for azure cosmos db
- - download the setting - press F1
- right click - function.json - click add binding
  For each of the endpoint we need to create separate binding.

#### Create Dish

**Route: POST
url: /dishes**

We will start with CreateDish first
go to the create dish folder and right click on the function.json and click add binding
note: for create dish and change dish, we need to create direction:out binding
name: dishDocument
databaseName: potluckdb
createIfNotExists:true
partitionKey: /friend

Now the binding for create dish is added, now we can write code for create dish

### Change Dish

**ROUTE: PUT
url: /dishes/{id}**

just like the same for create dish, we add a binding in the function.json , in the folder change dish, exactly same as that of create dish, that is an out binding

### Get Dish

**ROUTE: GET
url: /dishes**
we create a new binding for get dish, here it is an IN Binding
settings are
direction : in
name:dishes
databaseName: potluckdb
collectionName: MyCollection
partitionKey: /friend

when the binding of the name dishes is added, we can write code to get access the bindings by calling dishes in the binding.

### Remove Dish

**ROUTE: DELETE
url: "/dishes/{id}"**
Removing an item is tricky here, as there is no direct binding available for deleting an item,
for that we need to install "@azure/cosmos"
running the command `npm install @azure/cosmos` will install it
We have to manually write the query to find the item from the collections based on the id, and have to delete.
