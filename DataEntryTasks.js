var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors')
var schema = require('./TypedSchema');

// Construct a schema, using GraphQL schema language
const tasks =
  [
    {
      id: 1,
      itemTypes: [{ id: 'otherInformation', variantId: 'uk', order: 1 }]
    }
  ]
const taskApi = id => Promise.resolve(tasks);

const itemTypes = {
  otherInformation: {
    description: "Other Information",
    baseType: "ItemMemo",
  }
};
const itemTypeApi = (idsAndVariants) => Promise.resolve(itemTypes);

const productVersionData = {
  otherInformation: {
    value: "it's a little fish that can be found in Hawaii",
  },
}
const productVersionsApi = id => Promise.resolve(productVersionData);;



// The root provides a resolver function for each API endpoInt
var resolver = {
  task: async (id) => {
    var tasks = await taskApi(id);
    var itemTypes = await itemTypeApi(id);
    var productVersionData = await productVersionsApi(id);

    const task = tasks[0];
    task.itemTypes =
      Object.keys(itemTypes)
        .map(itemTypeId =>
          Object.assign({},
            itemTypeConfiguration(itemTypes, itemTypeId),
            itemTypeIdentifier(itemTypeId),
            itemValue(productVersionData,itemTypeId)
          ));
    return task;
  },

  submitData: async (data) => {
    productVersionData.otherInformation.value = "oop";
    return "hi";
  }
};

const itemTypeConfiguration = (itemTypes, itemTypeId) => itemTypes[itemTypeId];
const itemTypeIdentifier = (itemTypeId) => { return { itemTypeId } };
const itemValue = (value,itemTypeId) => { return { value: { value: productVersionData[itemTypeId].value } } };

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}));
var port = process.env.PORT || 1337;
app.listen(port);
console.log('Running a GraphQL API server at http://localhost:1337/graphql');
