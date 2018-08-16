var { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLFloat } = require('graphql');

const ValueTypeM = new GraphQLInputObjectType({
    name: 'ValueTypeM',
    description: 'ValueTypeM',
    fields: () => ({
        value: { type: new GraphQLList(GraphQLString) },
        nameTypes: { type: new GraphQLList(NameTypeM) },
    }),
});

const ItemTypeM = new GraphQLInputObjectType({
    name: 'ItemTypeM',
    description: 'ItemTypeM',
    fields: () => ({
        itemTypeId: { type: GraphQLString },
        baseType: { type: GraphQLString },
        value: { type: ValueTypeM },
    }),
});

const NameTypeM = new GraphQLInputObjectType({
    name: 'NameTypeM',
    description: 'NameTypeM',
    fields: () => ({
        nameTypeId: { type: GraphQLString },
        value: { type: [NameTypeValueM] },
    }),
});

const NameTypeValueM = new GraphQLInputObjectType({
    name: 'NameTypeValueM',
    description: 'NameTypeValueM',
    fields: () => ({
        unit: { type: new GraphQLNonNull(GraphQLString) },
        headings: { type: new GraphQLList(GraphQLString) },
        nutrients: { type: new GraphQLList(NutrientM) },
        lookupId: { type: new GraphQLNonNull(GraphQLInt) },
        text: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const NutrientM = new GraphQLInputObjectType({
    name: 'NutrientM',
    description: 'NutrientM',
    fields: () => ({
        description: { type: new GraphQLNonNull(GraphQLString) },
        values: { type: new GraphQLList(GraphQLFloat) },
    }),
});

const ValueType = new GraphQLObjectType({
    name: 'ValueType',
    description: 'ValueType',
    fields: () => ({
        value: { type:  GraphQLString },
    }),
});

const Rule = new GraphQLObjectType({
    name: 'Rule',
    description: 'Rule',
    fields: () => ({
        constraints: { type: new GraphQLList(GraphQLInt) },
    }),
});

const Error = new GraphQLObjectType({
    name: 'Error',
    description: 'Error',
    fields: () => ({
        raisedBy: { type: User },
        raisedOn: { type: GraphQLString },
        message: { type: GraphQLString },
        resolvedBy: { type: User },
        resolutionComment: { type: new GraphQLNonNull(GraphQLString) },
        resolvedOn: { type: new GraphQLNonNull(GraphQLString) },
        resolutionType: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const User = new GraphQLObjectType({
    name: 'User',
    description: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    }),
});

const Nutrient = new GraphQLObjectType({
    name: 'Nutrient',
    description: 'Nutrient',
    fields: () => ({
        description: { type: new GraphQLList(GraphQLString) },
        values: { type: [Float] },
    }),
});

const NameTypeValue = new GraphQLObjectType({
    name: 'NameTypeValue',
    description: 'NameTypeValue',
    fields: () => ({
        unit: { type: new GraphQLNonNull(GraphQLString) },
        headings: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
        nutrients: { type: new GraphQLList(Nutrient) },
        lookupId: { type: new new GraphQLNonNull(GraphQLInt) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        errors: { type: new GraphQLList(Error) },
    }),
});

const NameType = new GraphQLObjectType({
    name: 'NameType',
    description: 'NameType',
    fields: () => ({
        nameTypeId: { type: GraphQLString },
        rules: { type: new GraphQLList(Rule) },
        value: { type: new GraphQLList(NameTypeValue) },
    }),
});

const ItemType = new GraphQLObjectType({
    name: 'ItemType',
    description: 'ItemType',
    fields: () => ({
        itemTypeId: { type: new GraphQLNonNull(GraphQLString) },
        baseType: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: ValueType },
    }),
});

const Task = new GraphQLObjectType({
    name: 'Task',
    description: 'A data entry task',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        itemTypes: { type: new GraphQLList(ItemType) },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Query',
    fields: () => ({
        task: { type: Task },
    }),
});

// const Mutation = new GraphQLObjectType({
//     submitData(data: new GraphQLList(ItemTypeM): GraphQLString
//     });

module.exports = new GraphQLSchema({ query: Query });