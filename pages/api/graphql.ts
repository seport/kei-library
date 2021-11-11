import  {  ApolloServer  }  from  "apollo-server-micro";
import { PrismaClient } from '@prisma/client';
import  { typeDefs } from "./../../graphql/schema"
import { 
  itemsQuery,
  itemQuery,
  postItemMutation, 
  updateItemMutation,
  deleteItemMutation,
  addItemToCloset,
  removeItemFromCloset,
  closetItemsQuery
} from "./models/Item";
import { colorsQuery } from "./models/Color";
import { sizesQuery } from "./models/Size";
import type { NextApiRequest, NextApiResponse } from 'next'
import { userQuery } from "./models/User";
import { getSession } from "next-auth/client";

type Data = {
  name: string
}

const prisma = new PrismaClient()

const resolvers = {
  Query: {
    itemList: itemsQuery,
    item: itemQuery,
    colors: colorsQuery,
    sizes: sizesQuery,
    user: userQuery,
    closetItems: closetItemsQuery,
  },
  Mutation: {
    postItem: postItemMutation,
    updateItem: updateItemMutation,
    deleteItem: deleteItemMutation,
    addItemToCloset: addItemToCloset,
    removeItemFromCloset: removeItemFromCloset,
  },
}

const apolloServer = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: async ({req}) => {
    const session = await getSession({ req });
    return { prisma, session } 
  }
  });

export const config = {
  api:  { bodyParser: false },
}

const startServer = apolloServer.start();

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com',
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', ' Content-Type');

  if (req.method === "OPTIONS") {
      res.end();
      return false;
  }

  await startServer;
  await apolloServer.createHandler({
      path: "/api/graphql",
  })(req, res);
}
