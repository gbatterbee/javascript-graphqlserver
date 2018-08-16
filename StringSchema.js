'use strict';

var { buildSchema,GraphQLSchema } = require('graphql');
const schema = buildSchema(
    `
    type Task {
      id: ID!
      itemTypes: [ItemType]
    }
    
    type ItemType {
      itemTypeId:String
      baseType:String
      value:ValueType!
    }
    
    type ValueType {
      value:String!
  #    nameTypes:[NameType!]
    }
  
    type NameType {
      nameTypeId:String
      rules:[Rule]!
      value:[NameTypeValue]
    }
  
    type NameTypeValue{
      unit:String!
      headings:[String!]
      nutrients:[Nutrient!]
      lookupId:Int!
      text:String!
      errors:[Error!]
    }
  
  
    type Rule{
      constraInts:[Int]
    }
  
    type Error{
      raisedBy:User
      raisedOn:String
      message:String
      resolvedBy:User!
      resolutionComment:String!
      resolvedOn:String!
      resolutionType:String!
    }
  
    type User{
      id:String
      name:String
    }
  
    type Nutrient{
      description:[String]
      values:[Float]
    }
  
    type Query {
      task: Task
    }
  
    input ItemTypeM {
      itemTypeId:String
      baseType:String
      value:ValueTypeM
    }
  
    input ValueTypeM {
      value:[String!]
      nameTypes:[NameTypeM!]
    }
    
    input NameTypeM {
      nameTypeId:String
      value:[NameTypeValueM]
    }
  
    input NameTypeValueM{
      unit:String!
      headings:[String!]
      nutrients:[NutrientM!]
      lookupId:Int!
      text:String!
    }
  
    input NutrientM{
      description:[String]
      values:[Float]
    }
  
    type Mutation {
      submitData(data: [ItemTypeM]):String
    }
  
  `);

  module.exports = schema;