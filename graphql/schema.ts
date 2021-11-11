import  { gql }  from  "apollo-server-micro"; 

export const typeDefs = gql`
type Query {
  itemList(skip: Int, take: Int, search: String): ItemList!
  item(id: ID!): Item
  colors: [Color!]!
  sizes: [Size!]!
  user(id: ID!): User
  closetItems: [Item!]
}

type ItemList {
  results: [Item!]!
  totalPages: Int!
  currentPage: Int!
  totalResults: Int!
}

type Mutation {
postItem(
  name: String!, 
  itemNumber: String!,
  description: String, 
  price: Int, 
  material: String,
  measurements: String,
  colors: [String!],
  sizes: [String!]): Item!
updateItem(
  id: ID!,
  name: String, 
  itemNumber: String,
  description: String, 
  price: Int,
  material: String,
  measurements: String,
  colors: [String!],
  sizes: [String!]): Item
deleteItem(id: ID!): Item
addItemToCloset(itemId: ID!): Item
removeItemFromCloset(itemId: ID!): Item
}

type Item {
id: ID!
createdAt: String!
name: String!
itemNumber: String!
description: String
price: Int
material: String
measurements: String
colors: [Color!]
sizes: [Size!]
userClosets: [User!]
image: [ItemImage!]
}

type ItemImage {
id: ID!
createdAt: String!
data: String!
}

type Color {
id: ID!
createdAt: String!
name: String!
items: [Item]
}

type Size {
id: ID!
createdAt: String!
name: String!
items: [Item]
}

type User {
  id: ID!
  createdAt: String!
  name: String
  email: String!
  closetItems: [Item!]
}
`